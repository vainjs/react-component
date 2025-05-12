import type { ReactNode, CSSProperties, Dispatch, SetStateAction } from 'react';
import type { BasicTarget } from '@seeyon/bpm-core';

export type { FC, ReactNode, CSSProperties } from 'react';

export type SizeMap = Map<string, number>;

export type MoreRenderParams = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  omittedChildNodes: ReactNode[];
  open: boolean;
};

export type FlexBoxProps = {
  moreRender(params: MoreRenderParams): ReactNode[];
  style?: CSSProperties;
  children?: ReactNode;
  /**
   * 自定义根节点，用于执行 onResize
   */
  root?: BasicTarget;
  gap?: number;
};

export type FlexBoxMeasureProps = {
  addItemSize(id: string, size: number): void;
  children?: ReactNode;
};
