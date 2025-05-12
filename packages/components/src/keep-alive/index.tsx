import InternalKeepAlive from './keep-alive';
import Provider from './provider';

type KeepAliveType = typeof InternalKeepAlive & {
  Provider: typeof Provider;
};

const KeepAlive = InternalKeepAlive as KeepAliveType;
KeepAlive.Provider = Provider;

export default KeepAlive;
