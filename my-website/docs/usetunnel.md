---
id: usetunnel
title: The Use Tunnel Hook
---

The `useTunnel` its a hook that provides you the state for the stores that you want.

```tsx
import React from 'react';
import { useTunnel } from '@tunneljs/tunnel';
import { IUserState } from './userStore';

const User: FC = () => {
  const { User } = useTunnel<{ User: IUserState }>(['User']);

  return (
    <div>
      <p>{User.user.name}</p>
    </div>
  );
};

export default User;
```

## Parameters

- `storeNames`: It's an array of stores that you want to consume

## Return

The return will be an object of stores that you requested.
