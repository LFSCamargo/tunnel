export type Listener = (storeName: string, next: any) => void;

export const createStore = () => {
  const listeners: Listener[] = [];
  const initial: Record<string, any> = {};

  return {
    getInitial: () => initial,
    setInitial: (storeName: string, next: any): void => {
      initial[storeName] = next;
    },
    subscribe: (listener: Listener): void => {
      listeners.push(listener);
    },
    unsubscribe: (listener: Listener): void => {
      listeners.splice(listeners.indexOf(listener), 1);
    },
    emit: (storeName: string, next: any): void => {
      for (const listener of listeners) {
        listener(storeName, next);
      }
    },
  };
};
