---
id: installation
title: Installing
sidebar_label: Installing
slug: /
---

## Installing Tunnel into your application

In order to install tunnel you can use yarn or npm to install into your javascript application

```sh
yarn add @tunneljs/tunnel
```

How to install using npm

```sh
npm i --save @tunneljs/tunnel
```

## Placing the provider

After installing you need to place the `TunnelProvider` to your application root React component

```jsx
import React from 'react';
import { TunnelProvider } from '@tunneljs/tunnel';

const App: React.FC = () => {
  return <TunnelProvider>...</TunnelProvider>;
};
```

:::note

To use tunnel your components needs to be wrapped with tunnel provider

:::

## All Set!

Now its all set to use tunnel let's see how to use it at [Basic Usage](simple.md)
