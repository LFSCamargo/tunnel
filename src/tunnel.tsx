import React, {
  createContext,
  FC,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  useMemo,
  useContext,
} from 'react';
import { usePrevious } from './helpers';
import storeEmitter from './storeEmitter';

export type PrevState<T> = (prevState: T) => T;
export type SubscribeFn<T> = (state: T) => any;

const store = storeEmitter();

const Context = createContext<Record<string, any>>({});

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
  storage?: WebStorage;
  persist?: boolean;
  storesToPersist?: string[];
  chidren: ReactNode;
};

export const TunnelProvider: FC<Props> = (props) => {
  const { storage, persist, storesToPersist = [], children } = props;
  const [state, setState] = useState(store.getInitial());
  const prevState = usePrevious(state);

  // Handles updates to the context API
  const handleUpdate = useCallback(
    (storeName: string, next: any) => {
      if (persist && storage && storesToPersist.includes(storeName)) {
        storage.setItem(
          `tunnel:${storeName}`,
          JSON.stringify(
            typeof next === 'function' ? next(prevState[storeName]) : next,
          ),
        );
      }
      setState({
        ...state,
        [storeName]:
          typeof next === 'function' ? next(prevState[storeName]) : next,
      });
    },
    [state, setState],
  );

  // Hydrates Context API from the Storage
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

  // Subscribe into tunnel updates
  useEffect(() => {
    store.subscribe(handleUpdate);
    return () => store.unsubscribe(handleUpdate);
  }, [store]);

  useEffect(() => {
    hydrateStore();
  }, []);

  return useMemo(
    () => <Context.Provider value={state}>{children}</Context.Provider>,
    [props, state],
  );
};

export function create<T extends any>(storeName: string, initial: T = {} as T) {
  store.setInitial(storeName, initial);

  return {
    enum: storeName,
    update: (next: T) => store.emit(storeName, next),
    subscribe: (fn: SubscribeFn<T>): (() => void) => {
      const sub = (selectedId: string, next: any) => {
        if (selectedId === storeName) fn(next);
      };

      store.subscribe(sub);
      return () => store.unsubscribe(sub);
    },
  };
}

// React hook to get the state from stores on tunnel
export function useTunnelState(storeNames: string[]) {
  const state = useContext(Context);

  return storeNames.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: state[curr],
    }),
    {},
  );
}
