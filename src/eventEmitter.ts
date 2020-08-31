import { EventEmitter } from 'fbemitter';

export type Listener = (storeName: string, nextState: any) => void;

type EventListener = {
  getInitial(): Record<string, any>;
  setInitial(storeName: string, nextState: any): void;
  subscribe: (listener: Listener) => (() => void);
  emit(storeName: string, nextState: any): void;
};

export const createListener = (): EventListener => {
  const emitter = new EventEmitter();
  const initial: Record<string, any> = {};

  return {
    getInitial: () => initial,
    setInitial: (storeName, nextState): void => {
      initial[storeName] = nextState;
    },
    subscribe: listener => {
      const storeWatcher = emitter.addListener('tunnel:state:change', (args: any[]) => {
        listener(args[0], args[1]);
      });

      return () => storeWatcher.remove();
    },
    emit: (storeName, nextState) => {
      emitter.emit('tunnel:state:change', [storeName, nextState]);
    },
  };
};
