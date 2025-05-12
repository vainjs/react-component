import type { FC, ReactNode } from 'react';
import { useMemo, useReducer, useId } from 'react';
import { map } from 'lodash';
import { context, CacheAction, CacheState } from './context';

interface KeepAliveProviderProps {
  children?: ReactNode;
}

function reducer(state: CacheState, action: CacheAction) {
  const id = action.payload.id;

  switch (action.type) {
    case 'CREATE':
      return { ...state, [id]: { scrolls: new Map(), ...state[id], ...action.payload } };
    case 'DESTROY':
      delete state[id];
      return { ...state };
    default:
      return state;
  }
}

const KeepAliveProvider: FC<KeepAliveProviderProps> = (props) => {
  const { children } = props;
  const [caches, dispatch] = useReducer(reducer, {});
  const randomId = useId();

  const contextValue = useMemo(() => ({ dispatch, caches }), [dispatch, caches]);

  const child = useMemo(
    () => (
      <>
        {children}
        <div style={{ display: 'none' }} id={`keep-alive-provider${randomId}`}>
          {map(caches, ({ element, domNodes, id }) => (
            <div
              id={`keep-alive-provider-${id}${randomId}`}
              ref={(node) => {
                if (node && !domNodes) {
                  dispatch({
                    type: 'CREATE',
                    payload: { id, domNodes: Array.from(node.childNodes) },
                  });
                }
              }}>
              {element}
            </div>
          ))}
        </div>
      </>
    ),
    [children, caches, randomId],
  );

  return <context.Provider value={contextValue}>{child}</context.Provider>;
};

export default KeepAliveProvider;
