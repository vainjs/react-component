import type {
  InitHandleState,
  SplitterProps,
  SplitterRef,
  PanelDataRef,
  ResizeEvent,
  PanelSizes,
  Panels,
} from './type'
import {
  type ReactNode,
  useImperativeHandle,
  useCallback,
  forwardRef,
  Children,
  useState,
  useMemo,
  useRef,
  useId,
  memo,
} from 'react'
import {
  getPrevAndNextResultByHandle,
  isMouseEvent,
  getMovement,
} from './utils'
import { SplitterContext } from './context'
import ResizeHandle from './ResizeHandle'

const Splitter = forwardRef<SplitterRef, SplitterProps>((props, ref) => {
  const { children, style, className, layout = 'horizontal' } = props
  const [activeHandleId, setActiveHandleId] = useState<string | null>(null)
  const initHandleStateRef = useRef<InitHandleState>({})
  const splitterRef = useRef<HTMLDivElement | null>(null)
  const [sizes, setSizes] = useState<PanelSizes>({})
  const panels = useRef<Panels>(new Map())
  const groupId = useId()

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        setSizes({})
      },
    }),
    []
  )

  const registerResizeHandle = useCallback(
    (handId: string) => {
      return (e: ResizeEvent, handle: HTMLDivElement) => {
        if (
          !activeHandleId ||
          activeHandleId !== handId ||
          !splitterRef.current
        )
          return
        e.preventDefault()
        const movement = getMovement(
          e,
          handle,
          layout,
          initHandleStateRef.current.correctOffset
        )
        if (movement === 0) return
        const result = getPrevAndNextResultByHandle(
          handle,
          splitterRef.current,
          movement,
          layout,
          panels
        )
        if (!result) return
        setSizes((prev) => ({ ...prev, ...result }))
      }
    },
    [layout, activeHandleId]
  )

  const registerPanel = useCallback(
    (panelId: string, panelRef: PanelDataRef) => {
      if (!panels.current.has(panelId)) {
        panels.current.set(panelId, panelRef)
      }
    },
    []
  )

  const unregisterPanel = useCallback((panelId: string) => {
    if (panels.current.has(panelId)) {
      panels.current.delete(panelId)
    }
  }, [])

  const onStartDragging = useCallback((handId: string, event: ResizeEvent) => {
    setActiveHandleId(handId)
    if (isMouseEvent(event)) {
      const resizeHandle = event.target as HTMLDivElement
      initHandleStateRef.current = {
        correctOffset:
          event.clientX - resizeHandle.getBoundingClientRect().left,
      }
    }
  }, [])

  const onStopDragging = useCallback(() => {
    setActiveHandleId(null)
    // todo collapsible
  }, [])

  const contextValue = useMemo(
    () => ({
      registerResizeHandle,
      unregisterPanel,
      onStartDragging,
      onStopDragging,
      registerPanel,
      activeHandleId,
      setSizes,
      layout,
      sizes,
    }),
    [
      registerResizeHandle,
      unregisterPanel,
      onStartDragging,
      onStopDragging,
      registerPanel,
      activeHandleId,
      setSizes,
      layout,
      sizes,
    ]
  )

  return (
    <SplitterContext.Provider value={contextValue}>
      <div
        style={{ height: '100%', ...style, display: 'flex' }}
        data-splitter-layout={layout}
        data-splitter-id={groupId}
        className={className}
        ref={splitterRef}>
        {Children.toArray(children).reduce(
          (acc: ReactNode[], child, index, array) =>
            [
              ...acc,
              child,
              index !== array.length - 1 && <ResizeHandle />,
            ].filter(Boolean),
          []
        )}
      </div>
    </SplitterContext.Provider>
  )
})

export default memo(Splitter)
