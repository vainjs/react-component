import type { HTMLAttributes, FC, ReactNode } from 'react';
import type { TableProps } from 'antd/lib/table';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { SyIcon } from '@seeyon/global';
import { memo, useMemo } from 'react';
import classNames from 'classnames';
import { Table } from '@seeyon/ui';
import SortTableRow from './row';
import styles from './index.module.less';

export interface SortTableProps extends TableProps<any> {
  move?(fromIndex: number, toIndex: number): void;
}

export function arrayMove<T = any>(array: T[], fromIndex: number, toIndex: number) {
  array = [...array];
  const [item] = array.splice(fromIndex, 1);
  array.splice(toIndex, 0, item);
  return array;
}

const SortTable: FC<SortTableProps> = (props) => {
  const { dataSource = [], move, columns, rowSelection, className, ...tableProps } = props;

  const actualColumns = useMemo(() => {
    if (rowSelection) return columns;
    return [
      {
        width: 30,
        className: styles['drag-handle'],
        render: () => <SyIcon name="LinedDrag" />,
      },
      ...(columns || []),
    ];
  }, [columns, rowSelection]);

  const actualRowSelection = useMemo(() => {
    if (!rowSelection) return;
    const { renderCell } = rowSelection;
    return {
      ...rowSelection,
      renderCell: (checked: boolean, record: any, index: number, originNode: ReactNode) => {
        return (
          <div className={styles['row-selection']}>
            <SyIcon name="LinedDrag" style={{ fontSize: 14 }} />
            <span className={styles.child}>
              {renderCell ? <>{renderCell(checked, record, index, originNode)}</> : originNode}
            </span>
          </div>
        );
      },
    };
  }, [rowSelection]);

  const components = useMemo(() => ({ body: { row: SortTableRow } }), []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        {...tableProps}
        onRow={(_, index) => ({ moveRow: move, index } as HTMLAttributes<HTMLTableRowElement>)}
        className={classNames(styles.table, className)}
        rowSelection={actualRowSelection}
        dataSource={dataSource}
        components={components}
        columns={actualColumns}
      />
    </DndProvider>
  );
};

export default memo(SortTable);
