import type { ItemSelectCallback, TreeTransferProps, TransferItem, TreeData, FC } from './type';
import { Empty, Transfer, Tree, Input } from '@seeyon/ui';
import { memo, useMemo, useCallback } from 'react';
import { isEmpty, reduce, isArray } from 'lodash';
import { SyIcon } from '@seeyon/global';
import classNames from 'classnames';
import { useSearch } from './hooks';

import styles from './index.module.less';

export type { TreeData, TransferItem, ChildRenderProps } from './type';

export function arrayMove<T = string>(array: T[], fromIndex: number, toIndex: number) {
  array = [...array];
  const [item] = array.splice(fromIndex, 1);
  array.splice(toIndex, 0, item);
  return array;
}

export const flatten = (treeData: TreeData = []): TransferItem[] =>
  reduce(
    treeData,
    (prev, { children, ...item }) =>
      prev.concat(
        isArray(children) && children.length > 0 ? flatten(children) : (item as TransferItem),
      ),
    [] as TransferItem[],
  );

//显示功能 打平 treeNodeType为field才装填进去
export const showFlatten = (treeData: TreeData = []): TransferItem[] => {
  const flatten2 = (data: TreeData): TransferItem[] => {
    return reduce(
      data,
      (prev, { children, ...item }) => {
        const flattenedChildren =
          isArray(children) && children.length > 0 ? flatten2(children) : [];
        return prev.concat(item?.treeNodeType === 'field' ? item : null, flattenedChildren);
      },
      [],
    );
  };

  return flatten2(treeData).filter(Boolean);
};

const generateTree = (treeNodes: TreeData = [], checkedKeys: string[] = []): TreeData =>
  treeNodes.map(({ children, ...props }) => {
    const isLeaf = isEmpty(children);
    return {
      ...props,
      disabled: checkedKeys.includes(props.key as string),
      children: generateTree(children, checkedKeys),
      checkable: isLeaf,
      selectable: isLeaf,
    };
  });

//生成 显示 实体树
const generateShowEntityTree = (treeNodes: any[] = [], checkedKeys: string[] = []): TreeData =>
  treeNodes.map(({ children, ...props }) => {
    // const isLeaf = isEmpty(children);
    return {
      ...props,
      title: (
        <div className={styles.rowSpaceBetween}>
          <div>{props.title}</div>
          {props?.treeNodeType === 'group' && <div className={styles.rightTips}>分组</div>}
        </div>
      ),
      disabled: checkedKeys.includes(props.key as string),
      checkable: props?.treeNodeType === 'field',
      selectable: props?.treeNodeType === 'field',
      children: generateShowEntityTree(children, checkedKeys),
    };
  });

const handleItemSelect = (onItemSelect: ItemSelectCallback, checkedKeys: string[], key: string) => {
  onItemSelect(key, !checkedKeys.includes(key));
};

const TreeTransfer: FC<TreeTransferProps> = (props) => {
  const {
    targetKeys = [],
    searchPlaceholder,
    rightTreeProps,
    leftTreeProps,
    dataSource,
    showSearch,
    className,
    treeData,
    children,
    onChange,
    businessType = 'search',
    ...transferProps
  } = props;
  console.log('TreeTransfer', props);
  const { filteredTreeData, onSearch, expandedKeys, onExpand } = useSearch(treeData);
  const actualDataSource = useMemo(
    () => (isArray(dataSource) ? dataSource : flatten(treeData)),
    [treeData, dataSource],
  );

  const move = useCallback(
    (fromIndex: number, toIndex: number) => {
      const v = arrayMove([...targetKeys], fromIndex, toIndex);
      onChange?.(v);
    },
    [onChange, targetKeys],
  );

  const onDrop = useCallback(
    (e: any) => {
      if (isEmpty(targetKeys)) return;
      const { dropPosition, dropToGap, dragNodesKeys } = e;
      const fromIndex = targetKeys.indexOf(dragNodesKeys[0]);
      let toIndex = 0;
      // 从上往下
      if (fromIndex < dropPosition) {
        toIndex = dropToGap ? dropPosition - 1 : dropPosition;
      } else {
        // 从下往上
        toIndex = dropToGap ? dropPosition : dropPosition + 1;
        toIndex = toIndex < 0 ? 0 : toIndex;
      }
      move(fromIndex, toIndex);
    },
    [targetKeys, move],
  );
  const leftTreeData = useMemo(() => {
    const fucName = businessType === 'show' ? generateShowEntityTree : generateTree;
    return fucName(filteredTreeData, targetKeys);
  }, [businessType, filteredTreeData, targetKeys]);

  const actualLeftTreeProps = useMemo(() => {
    const treeProps = {
      checkStrictly: true,
      blockNode: true,
      checkable: true,
      ...leftTreeProps,
      treeData: leftTreeData,
    };
    if (!showSearch) return treeProps;
    if (!isEmpty(expandedKeys)) {
      treeProps.expandedKeys = expandedKeys;
      delete treeProps.defaultExpandedKeys;
    }
    return {
      ...treeProps,
      onExpand,
    };
  }, [leftTreeData, leftTreeProps, expandedKeys, showSearch, onExpand]);

  const actualRightTreeProps = useMemo(() => {
    const treeProps = {
      checkable: true,
      blockNode: true,
      ...rightTreeProps,
    };
    if (!treeProps.draggable) return treeProps;
    return { ...treeProps, onDrop };
  }, [onDrop, rightTreeProps]);

  return (
    <Transfer
      {...transferProps}
      className={classNames(styles.transfer, className)}
      dataSource={actualDataSource}
      targetKeys={targetKeys}
      onChange={onChange}>
      {({ direction, onItemSelect, onItemSelectAll, selectedKeys, filteredItems }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <>
              {showSearch && (
                <div className={styles.search}>
                  <Input
                    onChange={(e: any) => onSearch(e.target.value)}
                    suffix={<SyIcon name="lined-search" />}
                    placeholder={searchPlaceholder}
                  />
                </div>
              )}
              {isEmpty(leftTreeData) ? (
                <Empty />
              ) : (
                <Tree
                  {...actualLeftTreeProps}
                  onCheck={(_, e) => {
                    handleItemSelect(onItemSelect, checkedKeys, e.node.key as string);
                  }}
                  onSelect={(_, e) => {
                    handleItemSelect(onItemSelect, checkedKeys, e.node.key as string);
                  }}
                  checkedKeys={checkedKeys}
                />
              )}
            </>
          );
        } else if (direction === 'right') {
          if (isEmpty(filteredItems)) return <Empty />;
          const originNode = (
            <Tree
              {...actualRightTreeProps}
              onCheck={(_, e) => {
                handleItemSelect(onItemSelect, selectedKeys, e.node.key as string);
              }}
              onSelect={(_, e) => {
                handleItemSelect(onItemSelect, selectedKeys, e.node.key as string);
              }}
              treeData={filteredItems as TreeData}
              checkedKeys={selectedKeys}
            />
          );
          return typeof children === 'function'
            ? children({
                onItemSelectAll,
                onItemSelect,
                filteredItems,
                selectedKeys,
                originNode,
                move,
              })
            : originNode;
        }
      }}
    </Transfer>
  );
};

export default memo(TreeTransfer);
