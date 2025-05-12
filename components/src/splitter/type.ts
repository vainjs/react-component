import type { MutableRefObject, SetStateAction, CSSProperties, ReactNode, Dispatch, Key } from 'react'

export type { MouseEvent as ReactMouseEvent, MutableRefObject, CSSProperties, ReactNode, FC } from 'react'

export type Layout = 'horizontal' | 'vertical'

// native event
export type ResizeEvent = KeyboardEvent | MouseEvent | TouchEvent

export type ResizeHandle = (event: ResizeEvent, handle: HTMLDivElement) => void

export type PanelProps = {
  onResize?: (collapsed: boolean, key?: Key) => void
  collapsedSize?: number
  collapsible?: boolean
  style?: CSSProperties
  children?: ReactNode
  className?: string
  minSize?: number
  maxSize?: number
  key?: Key
}

export type PanelRef = {
  resize: (size: number) => void
  collapse: () => void
}

export type PanelData = Omit<PanelProps, 'style' | 'children'>

export type PanelDataRef = MutableRefObject<PanelData>

export type Panels = Map<string, PanelDataRef>

export type PanelsRef = MutableRefObject<Panels>

export type CursorState = 'horizontal-collapsibled' | 'vertical-collapsibled' | 'horizontal' | 'vertical'

export type PanelSizes = Record<string, number>

export type InitHandleState = { correctOffset?: number }

export type SplitterContextProps = {
  onStartDragging: (id: string, event: ResizeEvent) => void
  registerPanel: (id: string, panel: PanelDataRef) => void
  registerResizeHandle: (id: string) => ResizeHandle
  setSizes: Dispatch<SetStateAction<PanelSizes>>
  unregisterPanel: (id: string) => void
  onStopDragging: () => void
  activeHandleId: string | null
  sizes: PanelSizes
  layout: Layout
}

export type SplitterProps = {
  style?: CSSProperties
  children?: ReactNode
  className?: string
  layout?: Layout
}

export type SplitterRef = {
  reset(): void
}

export type PanelResizeHandleProps = {
  backgroundColor?: string
  highlightColor?: string
  highlightSize?: number
  triggerSize?: number
  hoverable?: boolean
  disabled?: boolean
}
