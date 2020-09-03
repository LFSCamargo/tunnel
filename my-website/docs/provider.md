---
id: provider
title: TunnelProvider
---

The `TunnelProvivider` component is mandatory to Tunnel to work! It's needed to store the global state and deliver the data to the other react components.

```jsx
import React from 'react';
import { TunnelProvider } from '@tunneljs/tunnel';

const Root = () => {
  return (
    <TunnelProvider
      persist={true}
      storage={localStorage}
      storesToPersist={['User']}>
      <ChildComponents />
    </TunnelProvider>
  );
};

export default Root;
```

## Props

- `persist`: A boolean to define if the persistance is enabled, default value is `false`
- `storage`: The storage for the platform that you are using. For React Native `AsyncStorage` and for web `localStorage`. default value is `localStorage`
- `storesToPersist`: It's an array of store names that you want to persist, default value is a empty array
