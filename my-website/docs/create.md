---
id: create
title: The Create Function
---

The `create` function it's made for defining the store and also to define the initial state for that store.

```tsx
import { create } from '@tunneljs/tunnel';

export interface IUserState {
  user: {
    name: string;
  };
}

const userStore = create<IUserState>('User', {
  user: {
    name: 'Luke',
  },
});
```

## Parameters

### Required

- `storeName`: It's the store name that you will use to connect to your components and to persist

### Not Required

- `initialState`: It's the initial state for that store, default value is a empty object

## Return

- `initialState`: It's the initial state for that store, default value is a empty object
- `enum`: It's the name that you defined to avoid typos, if you want to use it just export that and use it on `useTunnel` or on the `TunnelProvider` on the `storesToPersist` prop.
- `update`: It's the function that will update the store.
  - Parameters:
    - `nextState`: Here you can pass a new state to update the store, or a function that pass you as a parameter the previous state value and you should return a new value for updating the state.
- `subscribe`: It's a function that subscribes to changes on that specific store.
  - Parameters:
    - `subscribeFN`: It's a function that gives you as a parameter the state updated.
  - Return: Returns a function to you unsubscribe that store, its recommended to use when the component unmounts.
