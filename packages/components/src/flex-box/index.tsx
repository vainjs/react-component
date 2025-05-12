import type { FC, SizeMap, FlexBoxProps } from './type'
import { useCallback, useEffect, useState, Children, useMemo, useRef, memo } from 'react'
import { getTargetElement, useLatest, useResizeObserver } from '@vainjs/hooks'
import Measure from './Measure'

export type { MoreRenderParams, FlexBoxProps } from './type'

const noop = () => []

const FlexBox: FC<FlexBoxProps> = (props) => {
  const { root, moreRender = noop, gap = 8, children, style } = props
  const [isMeasured, setIsMeasured] = useState(false)
  const [endIndex, setEndIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const moreRef = useRef<HTMLDivElement | null>(null)
  const itemSizeRef = useRef<SizeMap>(new Map())
  const moreRenderRef = useLatest(moreRender)
  const initMoreSizeRef = useRef(0)

  const handleClip = useCallback(
    (boxWidth: number) => {
      let index = 0
      let path = []
      let sum = 0
      for (const [id, size] of itemSizeRef.current) {
        if (sum + size + gap * index > boxWidth) break
        index += 1
        sum += size
        path.push(id)
      }
      if (index > 0 && index < itemSizeRef.current.size) {
        const moreSize = moreRef.current ? moreRef.current.clientWidth : initMoreSizeRef.current
        while (sum + moreSize + gap * index > boxWidth) {
          index -= 1
          sum -= itemSizeRef.current.get(path.pop() as string) as number
        }
      }
      setEndIndex(index)
    },
    [gap]
  )

  useEffect(() => {
    if (!root) return
    rootRef.current = getTargetElement(root) as HTMLDivElement
  }, [root])

  useResizeObserver((entries) => {
    handleClip(entries[0].contentRect.width)
  }, rootRef)

  const addItemSize = useCallback(
    (id: string, size: number) => {
      itemSizeRef.current.set(id, size)
      if (itemSizeRef.current.size === Children.count(children)) {
        setIsMeasured(true)
        if (rootRef.current) {
          handleClip(rootRef.current.clientWidth)
        }
      }
    },
    [handleClip, children]
  )

  const addMoreSize = useCallback((id: string, size: number) => {
    initMoreSizeRef.current = size
  }, [])

  const moreRenderNodes = useMemo(() => {
    if (!isMeasured) return { expand: null, collapse: null, childNodes: [] }
    const childNodes = Children.toArray(children)
    const [expand, collapse] = moreRenderRef.current({
      omittedChildNodes: childNodes.slice(endIndex),
      setOpen,
      open,
    })
    return { expand, collapse, childNodes }
  }, [children, endIndex, moreRenderRef, open, isMeasured])

  const measureNodes = useMemo(
    () => (
      <>
        {Children.map(children, (childItem) => (
          <Measure addItemSize={addItemSize}>{childItem}</Measure>
        ))}
        {moreRenderNodes.expand && <Measure addItemSize={addMoreSize}>{moreRenderNodes.expand}</Measure>}
      </>
    ),
    [addItemSize, addMoreSize, children, moreRenderNodes.expand]
  )

  const actualChildren = useMemo(() => {
    if (!isMeasured) return null
    if (endIndex >= itemSizeRef.current.size) return children
    const { expand, collapse, childNodes } = moreRenderNodes
    if (!expand) return children
    if (open)
      return (
        <>
          {children}
          {collapse}
        </>
      )

    return (
      <>
        {childNodes.slice(0, endIndex)}
        <div style={{ display: 'inline-block' }} ref={moreRef}>
          {expand}
        </div>
      </>
    )
  }, [endIndex, children, moreRenderNodes, open, isMeasured])

  return (
    <>
      {measureNodes}
      {!root ? (
        <div
          data-key='flex-box-root'
          ref={rootRef}
          style={{
            ...style,
            flexWrap: open ? 'wrap' : 'nowrap',
            overflow: 'hidden',
            display: 'flex',
            width: '100%',
            gap,
          }}
        >
          {actualChildren}
        </div>
      ) : (
        actualChildren
      )}
    </>
  )
}

export default memo(FlexBox)
