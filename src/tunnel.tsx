import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createListener } from './eventEmitter';

export type PrevState<T> = (prevState: T) => T;
export type SubscribeFn<T> = (state: T) => any;

const store = createListener();

const Context = createContext(store.getInitial());

type Storage = {
  getItem(key: string, ...args: Array<any>): any;
  setItem(key: string, value: any, ...args: Array<any>): any;
  removeItem(key: string, ...args: Array<any>): any;
};

type WebStorage = Storage & {
  getItem(key: string, ...args: Array<any>): any;
  setItem(key: string, value: any, ...args: Array<any>): any;
  removeItem(key: string, ...args: Array<any>): any;
};

type Props = {
  storage?: WebStorage | Storage;
  persist?: boolean;
  storesToPersist?: string[];
};

export const TunnelProvider: FC<Props> = props => {
  const { storage, persist, storesToPersist = [], children } = props;
  const [state, setState] = useState(store.getInitial());

  const handleUpdate = useCallback(
    (storeName: string, next: any) => {
      return setState((prevState: Record<string, any>) => {
        if (persist && storage && storesToPersist.includes(storeName)) {
          storage.setItem(
            `tunnel:${storeName}`,
            JSON.stringify(
              typeof next === 'function' ? next(prevState[storeName]) : next,
            ),
          );
        }
        return {
          [storeName]:
            typeof next === 'function' ? next(prevState[storeName]) : next,
        };
      });
    },
    [state, setState],
  );

  const hydrateStore = useCallback(async () => {
    if (persist && storage) {
      await Promise.all(
        storesToPersist.map(async name => {
          const data = (await storage.getItem(`tunnel:${name}`)) || '{}';
          store.emit(name, JSON.parse(data));
        }),
      );
    }
  }, [storesToPersist]);

  useEffect(() => {
    const unsubscribe = store.subscribe(handleUpdate);
    return () => unsubscribe();
  }, [store]);

  useEffect(() => {
    hydrateStore();
  }, []);

  return useMemo(
    () => <Context.Provider value={state}>{children}</Context.Provider>,
    [state, children],
  );
};

TunnelProvider.defaultProps = {
  storage: localStorage,
};

type Store<T> = {
  initialState: T;
  enum: string;
  update: (nextState: T | PrevState<T>) => void;
  subscribe: (fn: SubscribeFn<T>) => () => void;
};

export function create<T extends any>(
  storeName: string,
  initial: T = {} as T,
): Store<T> {
  store.setInitial(storeName, initial);

  return {
    initialState: initial,
    enum: storeName,
    update: nextState => store.emit(storeName, nextState),
    subscribe: fn => {
      const sub = (selectedId: string, next: any) => {
        if (selectedId === storeName) fn(next);
      };

      const unsub = store.subscribe(sub);
      return () => unsub();
    },
  };
}

export function useTunnel<T extends any>(storeNames: string[]): T {
  const state = useContext(Context);
  return storeNames.reduce(
    (_prev, curr) => ({
      [curr]: state[curr],
    }),
    {} as any,
  );
}
