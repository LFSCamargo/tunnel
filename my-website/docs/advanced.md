---
id: advanced
title: Advanced Usage
---

## Advanced Usage

So Let's continue on how to use the tunneljs now a little bit more advanced, so on the previous tutorial we showed how to change data on the user store.

So now let's add a new store and fetch characters from the star wars api and lets persist only the characters store, using the persitance and hydration feature.

## Let's create a new store for characters

Let's create a store with the name as `Characters` and also add a initialState with a loading prop and a characters array

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

## Creating the action to get the characters

Let's create a function that fetches the `https://swapi.dev/api/people` endpoint and get some characters to display on the screen and also let's modify the state to display a loading indicator

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

So if you see you can pass a object or a function inside the update function to get the previous state value from the store, and spreading the previous state to keep the old state and modifying only the loading property.

## Plugging into the component

Now let's connect our store to our `Users` component that we created on the last tutorial and display the characters on the screen

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

## Persistance and Hydration

Now let's modify our root component to persist the Characters store only and keep the User store with the initialState values

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

To use on react native the Persistance and Hydration feature just use the `AsyncStorage` instead of `localStorage`

:::
