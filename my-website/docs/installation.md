---
id: installation
title: Installing
sidebar_label: Installing
slug: /
---

In order to install tunnel you can use [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable) or [npm (included with NodeJs)](https://nodejs.org/en/).

Yarn

```sh
yarn add @tunneljs/tunnel
```

Npm

```sh
npm i --save @tunneljs/tunnel
```

## Provider

After installing you need to add the `TunnelProvider` to your root React Component. Probably named `App.js`.

```jsx
import React from 'react';
import { TunnelProvider } from '@tunneljs/tunnel';

const App: React.FC = () => {
  return <TunnelProvider>...</TunnelProvider>;
};
```

:::note

For tunnel to work, your component needs to be a descendant of a tunnel provider, hence we recommend wrapping the root component.

:::

## All Set!

See Tunnel [Basic Usage](simple.md)
