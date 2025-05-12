import type { ReactNode, Dispatch } from 'react';
import { createContext } from 'react';

export type CachePayload = {
  scrolls?: Map<HTMLElement, number>;
  domNodes?: ChildNode[];
  element?: ReactNode;
  id: string;
};

export type CacheAction = {
  type: 'CREATE' | 'DESTROY';
  payload: CachePayload;
};

export type CacheState = Record<string, CachePayload>;

export type ContextValue = {
  dispatch: Dispatch<CacheAction>;
  caches: CacheState;
};

export const context = createContext<ContextValue>({} as ContextValue);
