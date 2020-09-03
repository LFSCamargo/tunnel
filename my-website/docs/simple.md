---
id: simple
title: Basic Usage
---

## Basic Usage

How to get started with Tunnel with a basic example, without persistence

## Create a store

Add a store with an initial state with a user that has a name property

### Javascript

```jsx
import { create } from '@tunneljs/tunnel';

const initialState = {
  user: {
    name: 'Luke',
  },
};

const userStore = create('User', initialState);
```

### Typescript

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

## Actions

Let's add a simple action that changes the user's name from `Luke` to `Rey`

```jsx
// Paste after the user store definiton
export const updateUserTest = () => {
  userStore.update({
    user: {
      name: 'Rey',
    },
  });
};
```

## Plugging into the component

Let's create a component that uses `userStore`

### Javascript

```tsx
import React from 'react';
import { useTunnel } from '@tunneljs/tunnel';
import { updateUserTest } from './userStore';

const User = () => {
  const { User } = useTunnel(['User']);

  return (
    <div>
      <p>{User.user.name}</p>
      <button type="button" onClick={updateUserTest}>
        Update User Name!
      </button>
    </div>
  );
};

export default User;
```

### Typescript

```tsx
import React from 'react';
import { useTunnel } from '@tunneljs/tunnel';
import { IUserState, updateUserTest } from './userStore';

const User: FC = () => {
  const { User } = useTunnel<{ User: IUserState }>(['User']);

  return (
    <div>
      <p>{User.user.name}</p>
      <button type="button" onClick={updateUserTest}>
        Update User Name!
      </button>
    </div>
  );
};

export default User;
```

## Wrapping the component

Now wrap the component that we created on the last step into the tunnel provider!

```jsx
import React from 'react';
import { TunnelProvider } from '@tunneljs/tunnel';
import User from './User';

const RootComponent = () => {
  return (
    <TunnelProvider>
      <User />
    </TunnelProvider>
  );
};

export default User;
```

## Conclusion

If you followed all the steps, clicking the `Update User Name!` button should change the name from `Luke` to `Rey`

[Advanced Usage](advanced.md)
