import type { CSSProperties, CursorState, ResizeEvent, Layout, PanelsRef, PanelData } from './type'

export function isMouseEvent(event: ResizeEvent): event is MouseEvent {
  return event.type.startsWith('mouse')
}

export function getMovement(
  event: ResizeEvent,
  resizeHandle: HTMLDivElement,
  direction: Layout,
  initialOffset = 0
): number {
  const isHorizontal = direction === 'horizontal'

  let pointerOffset = 0
  if (isMouseEvent(event)) {
    pointerOffset = isHorizontal ? event.clientX : event.clientY
  } else {
    return 0
  }

  const rect = resizeHandle.getBoundingClientRect()
  const handlerOffset = isHorizontal ? rect.left : rect.top
  return pointerOffset - handlerOffset - initialOffset
}

export function getSize(dom: HTMLDivElement, direction: Layout) {
  if (!dom) return 0
  const rect = dom.getBoundingClientRect()
  return direction === 'horizontal' ? rect.width : rect.height
}

export function calculateSize(panelId: string, size: number, panelData: PanelData = {}): [string, number] {
  let actualSize = size
  const { minSize, maxSize, collapsible, collapsedSize = 0 } = panelData
  if (collapsible && size <= collapsedSize) {
    actualSize = 0
  }
  if (minSize) {
    actualSize = Math.max(actualSize, minSize)
  }
  if (maxSize) {
    actualSize = Math.min(actualSize, maxSize)
  }
  return [panelId, actualSize]
}

function getActualPanelInfo(dom: HTMLDivElement, size: number, panels: PanelsRef): [string, number] {
  const panelId = dom.getAttribute('data-panel-id') as string
  const panelData = panels.current.get(panelId)?.current
  return calculateSize(panelId, size, panelData)
}

export function getPrevAndNextResultByHandle(
  handle: HTMLDivElement,
  group: HTMLDivElement,
  movement: number,
  direction: Layout,
  panels: PanelsRef
) {
  const prev = handle.previousSibling as HTMLDivElement
  const next = handle.nextSibling as HTMLDivElement
  if (!prev || !next) return
  const baseSize = getSize(group, direction)
  const prevSize = getSize(prev, direction)
  const nextSize = getSize(next, direction)
  const [prevId, prevActualSize] = getActualPanelInfo(prev, prevSize + movement, panels)
  const [nextId, nextActualSize] = getActualPanelInfo(next, nextSize - movement, panels)

  return {
    [prevId]: (prevActualSize / baseSize) * 100,
    [nextId]: (nextActualSize / baseSize) * 100,
  }
}

export function getCursorStyle(state: CursorState) {
  switch (state) {
    case 'horizontal':
      return 'col-resize'
    case 'vertical':
      return 'row-resize'
    case 'horizontal-collapsibled':
      return 'ew-resize'
    case 'vertical-collapsibled':
      return 'ns-resize'
  }
}

export function setIframeEventStyle(pointerEvents: CSSProperties['pointerEvents'] = 'auto') {
  document.querySelectorAll('iframe').forEach((iframe) => {
    if (iframe.style.pointerEvents !== pointerEvents) {
      iframe.style.setProperty('pointer-events', pointerEvents)
    }
  })
}
