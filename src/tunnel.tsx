import React, {
  createContext,
  FC,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { createStore } from './storeEmitter';

export type PrevState<T> = (prevState: T) => T;
export type SubscribeFn<T> = (state: T) => any;

const store = createStore();

const Context = createContext(store.getInitial());

interface Storage {
  getItem(key: string, ...args: Array<any>): any;
  setItem(key: string, value: any, ...args: Array<any>): any;
  removeItem(key: string, ...args: Array<any>): any;
}

interface WebStorage extends Storage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, item: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

type Props = {
  storage?: WebStorage | Storage;
  persist?: boolean;
  storesToPersist?: string[];
};

export const TunnelProvider: FC<Props> = (props) => {
  const { storage, persist, storesToPersist = [], children } = props;
  const [state, setState] = useState(store.getInitial());

  const handleUpdate = useCallback(
    (storeName: string, next: any) => {
      return setState((prevState) => {
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
        storesToPersist.map(async (name) => {
          const data = (await storage.getItem(`tunnel:${name}`)) || '{}';
          store.emit(name, JSON.parse(data));
        }),
      );
    }
  }, [storesToPersist]);

  useEffect(() => {
    store.subscribe(handleUpdate);
    return () => store.unsubscribe(handleUpdate);
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

export function create<T extends any>(storeName: string, initial: T = {} as T) {
  store.setInitial(storeName, initial);

  return {
    initialState: initial,
    enum: storeName,
    update: (next: T | PrevState<T>) => store.emit(storeName, next),
    subscribe: (fn: SubscribeFn<T>): (() => void) => {
      const sub = (selectedId: string, next: any) => {
        if (selectedId === storeName) fn(next);
      };

      store.subscribe(sub);
      return () => store.unsubscribe(sub);
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
