import type { TransferItem, TransferProps, TransferDirection } from 'antd/lib/transfer';
import type { TreeProps as ITreeProps } from 'antd/lib/tree';
import type { ReactNode } from 'react';

export type { TransferItem, TransferProps } from 'antd/lib/transfer';
export type { FC, ReactNode, Key } from 'react';
export type ItemSelectAllCallback = (keys: string[], selected: boolean) => void;
export type ItemSelectCallback = (key: string, selected: boolean) => void;
export type TreeProps = Omit<ITreeProps, 'treeData'>;
export type TreeData = ITreeProps['treeData'];

export type ChildRenderProps = {
  move(fromIndex: number, toIndex: number): void;
  onItemSelectAll: ItemSelectAllCallback;
  onItemSelect: ItemSelectCallback;
  filteredItems: TransferItem[];
  selectedKeys: string[];
  originNode: ReactNode;
};

export type TreeTransferProps = Omit<
  TransferProps<TransferItem>,
  'filterOption' | 'onSearch' | 'render' | 'children' | 'onChange'
> & {
  onChange?(targetKeys: string[], direction?: TransferDirection, moveKeys?: string[]): void;
  children?(props: ChildRenderProps): ReactNode;
  searchPlaceholder?: string;
  rightTreeProps?: TreeProps;
  leftTreeProps?: TreeProps;
  treeData?: TreeData;
  [key: string]: any;
};
