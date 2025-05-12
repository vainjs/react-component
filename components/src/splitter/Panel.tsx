import type { PanelData, PanelProps, PanelRef } from './type'
import { useImperativeHandle, useContext, forwardRef, useEffect, useMemo, useRef, useId, memo } from 'react'
import { SplitterContext } from './context'

const Panel = forwardRef<PanelRef, PanelProps>((props, ref) => {
  const { collapsedSize = 20, collapsible, className, onResize, children, minSize, maxSize, style, key } = props
  const { sizes, setSizes, registerPanel, unregisterPanel } = useContext(SplitterContext)
  const panelId = useId()
  const flexGrow = sizes[panelId]

  const panelDataRef = useRef<PanelData>({
    collapsedSize,
    collapsible,
    onResize,
    minSize,
    maxSize,
  })

  useImperativeHandle(
    ref,
    () => ({
      collapse() {
        if (collapsible) {
          setSizes((prev) => ({ ...prev, [panelId]: 0 }))
        }
      },
      resize(size: number) {
        setSizes((prev) => ({ ...prev, [panelId]: size }))
      },
    }),
    [collapsible, panelId, setSizes]
  )

  useEffect(() => {
    registerPanel(panelId, panelDataRef)

    return () => {
      unregisterPanel(panelId)
    }
  }, [panelId, registerPanel, unregisterPanel])

  useEffect(() => {
    if (onResize) {
      onResize(flexGrow === 0, key)
    }
  }, [flexGrow, key, onResize])

  const actualStyle = useMemo(() => {
    if (flexGrow === undefined) {
      return {
        ...style,
        flexBasis: 'auto',
        flexShrink: 1,
        overflow: 'hidden',
      }
    } else {
      return {
        ...style,
        flexGrow,
        flexBasis: 0,
        flexShrink: 1,
        overflow: 'hidden',
      }
    }
  }, [flexGrow, style])

  return (
    <div style={actualStyle} data-panel-id={panelId} key={key} className={className}>
      {children}
    </div>
  )
})

export default memo(Panel)
