---
id: advanced
title: Advanced Usage
---

On the previous tutorial we explained how to change data on the user store

Moving on to more complex topics now, let's add a new store and fetch characters from the star wars api and persist only the characters store, using the Persistence and Hydration features

## New store for characters

Create a store named `Characters`. Add an `initialState` with a loading prop and a characters array.

### Javascript

```jsx
import { create } from '@tunneljs/tunnel';

const initialState = {
  loading: false,
  characters: [],
};

const store = create('Characters', initialState);
```

### Typescript

```tsx
import { create } from '@tunneljs/tunnel';

export interface ICharactersState {
  loading: boolean;
  characters: string[];
}

const initialState = {
  loading: false,
  characters: [],
} as ICharactersState;

const store = create<ICharactersState>('Characters', initialState);
```

## Action to get the characters

Create a function that fetches the `https://swapi.dev/api/people` endpoint to get some characters to display on the screen. Also we'll modify the state to display a loading indicator

```jsx
// Paste after the characters store definiton
export const getCharacters = async () => {
  try {
    store.update((prev) => ({
      ...prev,
      loading: true,
    }));
    const req = await fetch('https://swapi.dev/api/people');
    const connection = await req.json();
    const { results } = connection;
    store.update({
      loading: false,
      characters: results.map((e) => e.name),
    });
  } catch (e) {
    store.update((prev) => ({
      ...prev,
      loading: false,
    }));
    throw e;
  }
};
```

We can pass an object or a function to the `store.update` method to get the previous state value from the store. Note that we also spread the previous state to keep the rest of the old state intact and modify only the loading property

## Plugging into the component

Connect the store to the `Users` component that we created on the last tutorial to display the characters on the screen

### Javascript

```jsx
import React from 'react';
import { useTunnel } from '@tunneljs/tunnel';
import { updateUserTest, getCharacters } from './userStore';

const User = () => {
  const { User, Characters } = useTunnel(['User', 'Characters']);

  return (
    <div>
      <p>{User.user.name}</p>
      <button type="button" onClick={updateUserTest}>
        Update User Name!
      </button>
      {Characters?.loading ? (
        <p>Loading...</p>
      ) : (
        Characters.characters.map((e) => <p>{e}</p>)
      )}
      <button type="button" onClick={getCharacters}>
        Get Characters!
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
import {
  IUserState,
  updateUserTest,
  ICharactersState,
  getCharacters,
} from './userStore';

const User: FC = () => {
  const { User, Characters } = useTunnel<{
    User: IUserState;
    Characters: ICharactersState;
  }>(['User', 'Characters']);

  return (
    <div>
      <p>{User.user.name}</p>
      <button type="button" onClick={updateUserTest}>
        Update User Name!
      </button>
      {Characters?.loading ? (
        <p>Loading...</p>
      ) : (
        Characters.characters.map((e) => <p>{e}</p>)
      )}
      <button type="button" onClick={getCharacters}>
        Get Characters!
      </button>
    </div>
  );
};

export default User;
```

## Persistence and Hydration

Modify the root component to persist the `Characters` store only, while keeping the `User` store with the `initialState` value

```jsx
import React from 'react';
import { TunnelProvider } from '@tunneljs/tunnel';
import User from './User';

const RootComponent = () => {
  return (
    <TunnelProvider
      persist={true}
      storesToPersist={['Characters']}
      storage={localStorage}>
      <User />
    </TunnelProvider>
  );
};

export default User;
```

:::note

To use the Persistence and Hydration feature on React Native use `AsyncStorage` instead of `localStorage`

:::
