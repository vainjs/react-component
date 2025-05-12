import type { FC, FlexBoxMeasureProps } from './type';
import { memo, useEffect, useRef, useId, useState } from 'react';
import { createPortal } from 'react-dom';

const FlexBoxMeasure: FC<FlexBoxMeasureProps> = (props) => {
  const { children, addItemSize } = props;
  const [visible, setVisible] = useState(true);
  const itemRef = useRef<HTMLDivElement>(null);
  const itemId = useId();

  useEffect(() => {
    if (!itemRef.current) return;
    addItemSize(itemId, itemRef.current.clientWidth);
    setVisible(false);
  }, [itemId, addItemSize]);

  return (
    <>
      {visible &&
        createPortal(
          <div style={{ position: 'absolute', left: '-100%' }} data-item-id={itemId} ref={itemRef}>
            {children}
          </div>,
          document.body,
        )}
    </>
  );
};

export default memo(FlexBoxMeasure);
