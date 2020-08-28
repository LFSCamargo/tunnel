# Tunnel

<img src="https://emojigraph.org/media/facebook/metro_1f687.png">

## What is Tunnel

Tunnel is a React Context abstraction based on old reworm code

## What's the difference from reworm to tunnel

Tunnel is using a updated version of React Context and also adds Support to React Native and Store Persisting in a Simple Way. And also it uses the best patterns for newer react applications, HOOKS!

# How to use tunnel

## Provider

Place the `TunnelProvider` into the root of your application

```tsx
import React from 'react';
import { TunnelProvider } from 'tunnel';

const App: React.FC = () => {
  return <TunnelProvider>...</TunnelProvider>;
};
```

You can persist stores on `React` and on `React Native` by simply passing the `persist`, `storesToPersist` and `storage` to the Provider

#### Obs: The storage option it's the localStorage by default for React Native just pass the AsyncStorage

Example:

```tsx
import React from 'react';
import { TunnelProvider } from 'tunnel';

const App: React.FC = () => {
  return (
    <TunnelProvider
      persist={true}
      storesToPersist={['StoreName']}
      storage={localStorage}
    >
      ...
    </TunnelProvider>
  );
};
```

## Create your store

```tsx
import { create } from 'tunnel';

export interface IUserState {
  user: {
    name: string;
  };
  loading: boolean;
}

const initialState = {
  user: {
    name: 'Change the user name',
  },
  loading: false,
} as IUserState;

const userStore = create<IUserState>('User', initialState);
```

## Creating Actions

```tsx
import { create } from 'tunnel';

export interface IUserState {
  user: {
    name: string;
  };
}

const initialState = {
  user: {
    name: 'Change the user name',
  },
} as IUserState;

const userStore = create<IUserState>('User', initialState);

export const updateUserTest = () => {
  const user = {
    name: 'Luiz Fernando',
  };

  userStore.update((previous): any => ({
    ...previous,
    user,
  }));
};
```

## Connecting

```tsx
import React from 'react';
import { useTunnel } from 'tunnel';
import { IUserState, updateUserTest } from './userStore';

export const User: FC = () => {
  const { User } = useTunnel<IUserState>(['User']);

  return (
    <div>
      <p>{User.user.name}</p>
      <button type="button" onClick={updateUserTest}>
        Update User Name!
      </button>
    </div>
  );
};
```
