---
id: simple
title: Basic Usage
---

## Basic Usage

Now i'll show you how to get started with TunnelJS with the Basic Stuff, without persistance and stuff

So without any further ado let's get started

## Let's create a simple store

Let's simply a store with a initial state with a user with a name property

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

## Adding Actions

Let's add a simple action that changes the state user name from `Luke` to `Rey`

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

Let's create a component that uses the `userStore`

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

Let's now wrap the component that we created on the last step into the tunnel provider!

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

Now if you followed all the steps, when you clicked the `Update User Name!` button the name should change from `Luke` to `Rey`

So now lets go to the [Advanced Usage](advanced.md)
