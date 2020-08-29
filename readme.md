# Tunnel

<div style="display: flex; align-items: center; justify-content: center; background-color: rgb(242,242,242);">
  <img src="https://i.imgur.com/PWyJDhN.png" width="300">
</div>

## What is Tunnel

Tunnel is a React Context API abstraction that allows you to make persistance into `AsyncStorage` and `localStorage`, and also allows you to
make a better structure in terms of code.

I built Tunnel on top of a old library that i contributed.

# How to use tunnel

## Install the package

In order to install tunnel simply run the command bellow

```sh
yarn add @tunneljs/tunnel
```

## Provider

Place the `TunnelProvider` into the root of your application

```tsx
import React from 'react';
import { TunnelProvider } from '@tunneljs/tunnel';

const App: React.FC = () => {
  return <TunnelProvider>...</TunnelProvider>;
};
```

You can persist stores on `React` and on `React Native` by simply passing the `persist`, `storesToPersist` and `storage` to the Provider

#### Obs: The storage option it's the localStorage by default for React Native just pass the AsyncStorage

Example:

```tsx
import React from 'react';
import { TunnelProvider } from '@tunneljs/tunnel';

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
import { create } from '@tunneljs/tunnel';

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
import { useTunnel } from '@tunneljs/tunnel';
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
