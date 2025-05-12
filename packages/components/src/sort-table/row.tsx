import type { HTMLAttributes, FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { memo, useRef } from 'react';
import classNames from 'classnames';
import styles from './row.module.less';

export interface SortTableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

const type = 'DraggableRow';

const SortTableRow: FC<SortTableRowProps> = (props) => {
  const { index, moveRow, className, style, ...restProps } = props;
  const ref = useRef<HTMLTableRowElement>(null);

  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) return {};
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? styles.downward : styles.upward,
      };
    },
    drop: (item: { index: number }) => {
      moveRow(item.index, index);
    },
  });

  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(drag(ref));

  return (
    <tr
      {...restProps}
      className={classNames({ [dropClassName as string]: isOver }, className)}
      style={{ cursor: 'move', ...style }}
      ref={ref}
    />
  );
};

export default memo(SortTableRow);
