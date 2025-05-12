import type { FC, ReactNode, CSSProperties } from 'react';
import { memo, useEffect, useContext, useRef, useMemo } from 'react';
import { context } from './context';

export interface KeepAliveProps {
  style?: CSSProperties;
  children?: ReactNode;
  className?: string;
  scroll?: boolean;
  name: string;
}

const KeepAlive: FC<KeepAliveProps> = (props) => {
  const { scroll = false, name, style, className, children } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const { dispatch, caches } = useContext(context);
  const { domNodes, scrolls } = useMemo(() => caches[name] || {}, [caches, name]);

  useEffect(() => {
    if (!scroll || !scrolls || !containerRef.current) return;
    const controller = new AbortController();
    containerRef.current.addEventListener(
      'scroll',
      (e) => {
        const t = e.target as HTMLElement;
        scrolls?.set(t, t.scrollTop);
      },
      {
        signal: controller.signal,
        capture: true,
      },
    );

    return () => {
      controller.abort();
    };
  }, [scrolls, scroll, name]);

  useEffect(() => {
    dispatch({ type: 'CREATE', payload: { id: name, element: children } });
  }, [dispatch, children, name]);

  useEffect(() => {
    if (domNodes && containerRef.current) {
      domNodes.forEach((node) => {
        containerRef.current?.appendChild(node);
      });
    }
  }, [domNodes]);

  useEffect(() => {
    if (scroll && scrolls) {
      scrolls.forEach((scrollTop, dom) => {
        dom.scrollTop = scrollTop;
      });
    }
  }, [scroll, scrolls]);

  return <div ref={containerRef} id={`keep-alive-${name}`} style={style} className={className} />;
};

export default memo(KeepAlive);
