import type {
  PanelResizeHandleProps,
  ReactMouseEvent,
  CSSProperties,
  ResizeHandle,
  ResizeEvent,
  CursorState,
  FC,
} from './type'
import { memo, useMemo, useContext, useId, useEffect, useRef, useCallback, useState } from 'react'
import { getCursorStyle, setIframeEventStyle } from './utils'
import { SplitterContext } from './context'

const PanelResizeHandle: FC<PanelResizeHandleProps> = (props) => {
  const {
    backgroundColor = 'rgba(0, 0, 0, 0.04)',
    highlightSize = 2,
    triggerSize = 6,
    highlightColor,
    hoverable,
    disabled,
  } = props
  const { registerResizeHandle, onStartDragging, onStopDragging, activeHandleId, layout, sizes } =
    useContext(SplitterContext)
  const resizeHandleRef = useRef<ResizeHandle | null>(null)
  const handleDomRef = useRef<HTMLDivElement>(null)
  const [isHover, setHover] = useState(false)
  const handleId = useId()
  const isDragging = activeHandleId === handleId

  const onMouseDown = useCallback(
    (event: ReactMouseEvent) => {
      onStartDragging(handleId, event.nativeEvent)
      setIframeEventStyle('none')
    },
    [onStartDragging, handleId]
  )

  const onMouseUp = useCallback(() => {
    onStopDragging()
    setIframeEventStyle('auto')
  }, [onStopDragging])

  useEffect(() => {
    if (disabled) {
      resizeHandleRef.current = null
    } else {
      resizeHandleRef.current = registerResizeHandle(handleId)
    }
  }, [registerResizeHandle, disabled, handleId])

  useEffect(() => {
    if (disabled || !handleDomRef.current || !resizeHandleRef.current) return
    const targetDocument = handleDomRef.current.ownerDocument
    const controller = new AbortController()
    const onMove = (event: ResizeEvent) => {
      resizeHandleRef.current!(event, handleDomRef.current as HTMLDivElement)
    }

    targetDocument.addEventListener('mousemove', onMove, { signal: controller.signal })
    targetDocument.addEventListener('touchmove', onMove, { signal: controller.signal })
    targetDocument.addEventListener('mouseup', onMouseUp, { signal: controller.signal })

    return () => {
      controller.abort()
    }
  }, [disabled, onMouseUp])

  useEffect(() => {
    if (disabled || !handleDomRef.current || !hoverable) return
    const controller = new AbortController()
    handleDomRef.current.addEventListener(
      'mouseenter',
      () => {
        setHover(true)
      },
      { signal: controller.signal }
    )
    handleDomRef.current.addEventListener(
      'mouseleave',
      () => {
        setHover(false)
      },
      { signal: controller.signal }
    )

    return () => {
      controller.abort()
    }
  }, [disabled, hoverable])

  const actualSize = useMemo(() => {
    if (layout === 'horizontal') {
      return {
        width: highlightSize + triggerSize * 2,
        margin: `0 -${triggerSize}px`,
        padding: `0 ${triggerSize}px`,
      }
    }
    if (layout === 'vertical') {
      return {
        height: highlightSize + triggerSize * 2,
        margin: `-${triggerSize}px 0`,
        padding: `${triggerSize}px 0`,
      }
    }
  }, [highlightSize, triggerSize, layout])

  const actualStyle: CSSProperties = useMemo(() => {
    const collapsibled = Object.values(sizes).some((v) => v === 0)
    const cursorState: CursorState = collapsibled ? `${layout}-collapsibled` : layout

    return {
      ...actualSize,
      ...{
        backgroundColor: (isDragging || isHover) && highlightColor ? highlightColor : backgroundColor,
        cursor: getCursorStyle(cursorState),
        backgroundClip: 'content-box',
        boxSizing: 'border-box',
        touchAction: 'none',
        userSelect: 'none',
        zIndex: 9,
      },
    }
  }, [sizes, layout, actualSize, highlightColor, isDragging, isHover, backgroundColor])

  return (
    <div
      data-panel-handle-active={isDragging ? true : undefined}
      data-panel-handle-id={handleId}
      onMouseDown={onMouseDown}
      onTouchCancel={onMouseUp}
      onTouchEnd={onMouseUp}
      onMouseUp={onMouseUp}
      style={actualStyle}
      ref={handleDomRef}
    />
  )
}

export default memo(PanelResizeHandle)
