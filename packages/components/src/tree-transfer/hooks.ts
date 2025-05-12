import type { Key, TreeData } from './type';
import { useState, useCallback, useRef, useEffect } from 'react';
import { cloneDeep, isEmpty, filter } from 'lodash';

export function useSearch(treeData: TreeData) {
  const [filteredTreeData, setFilteredTreeData] = useState<TreeData>(treeData);
  const expandedKeysRef = useRef<Key[]>([]);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    setFilteredTreeData(treeData);
  }, [treeData]);

  const filterTreeData = useCallback((treeData: TreeData = [], searchValue: string) => {
    if (!searchValue) return treeData;
    treeData = cloneDeep(treeData);

    return filter(treeData, (item) => {
      const { title, children, key } = item;
      if (!isEmpty(children)) {
        const res = filterTreeData(children, searchValue);
        if (!isEmpty(res)) {
          item.children = res;
          expandedKeysRef.current.push(key);
          return true;
        }
        return false;
      }
      return (title as string).includes(searchValue);
    });
  }, []);

  const onExpand = useCallback((newExpandedKeys: Key[]) => {
    expandedKeysRef.current = newExpandedKeys;
    forceUpdate({});
  }, []);

  const onSearch = useCallback(
    (value: string) => {
      expandedKeysRef.current = [];
      setFilteredTreeData(filterTreeData(treeData, value));
    },
    [filterTreeData, treeData],
  );

  return {
    expandedKeys: expandedKeysRef.current,
    filteredTreeData,
    onSearch,
    onExpand,
  };
}
