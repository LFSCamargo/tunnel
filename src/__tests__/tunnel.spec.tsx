import React, { useEffect, useState } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { TunnelProvider, create, useTunnel } from '..';

const promise = Promise.resolve();

describe('Tunnel tests', () => {
  it('should render the provider', () => {
    const wrapper = render(<TunnelProvider />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update the state with a function', async () => {
    const state = {
      loading: false,
      username: 'luizinho',
    };
    const store = create('user', state);

    const changeStoreValue = () => {
      store.update(prev => {
        return {
          ...prev,
          loading: true,
        };
      });

      store.update(prev => {
        return {
          ...prev,
          username: 'Luiz Fernando',
          loading: true,
        };
      });
    };

    const App = () => {
      const { user } = useTunnel<{ user: typeof state }>([store.enum]);
      return (
        <div>
          <div data-testid="user_username">{user.username}</div>
          <button data-testid="change_user_username" onClick={changeStoreValue}>
            Change Username
          </button>
        </div>
      );
    };

    const wrapper = render(
      <TunnelProvider>
        <App />
      </TunnelProvider>,
    );

    const { getByTestId } = wrapper;

    fireEvent(
      getByTestId('change_user_username'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    await act(() => promise);

    expect(getByTestId('user_username').textContent).toBe('Luiz Fernando');
  });

  it('should subscribe to a state change', async () => {
    const valueChanged = 'value changed';
    const store = create('testStore', 'value');
    const changeStoreValue = (value: string) => store.update(value);
    const App = () => {
      const [value, setValue] = useState('');
      const { testStore } = useTunnel<{ testStore: string }>([store.enum]);

      useEffect(() => {
        const unsubscribe = store.subscribe(setValue);
        return () => unsubscribe();
      }, [store]);

      return (
        <>
          <button
            onClick={() => changeStoreValue(valueChanged)}
            data-testid="changeStoreValue"
          >
            Change Store Value
          </button>
          <div data-testid="storeValue">{testStore}</div>
          <div data-testid="stateValue">{value}</div>
        </>
      );
    };

    const wrapper = render(
      <TunnelProvider>
        <App />
      </TunnelProvider>,
    );

    const { getByTestId } = wrapper;

    fireEvent(
      getByTestId('changeStoreValue'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    await act(() => promise);

    expect(getByTestId('storeValue', {}, { timeout: 1000 }).textContent).toBe(
      valueChanged,
    );
    expect(getByTestId('stateValue', {}, { timeout: 1000 }).textContent).toBe(
      valueChanged,
    );

    wrapper.unmount();
  });

  it('should trigger a state change', async () => {
    const store = create('user', 'luiz');
    const changeUsername = () => store.update('jest');
    const App = () => {
      const { user } = useTunnel<{ user: string }>([store.enum]);
      return (
        <div>
          <div data-testid="username">{user}</div>
          <button data-testid="change_username" onClick={changeUsername}>
            Change Username
          </button>
        </div>
      );
    };

    const wrapper = render(
      <TunnelProvider>
        <App />
      </TunnelProvider>,
    );

    const { getByTestId } = wrapper;

    fireEvent(
      getByTestId('change_username'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    await act(() => promise);

    expect(getByTestId('username').textContent).toBe('jest');
  });

  it('should trigger a simple state change and save it to local storage', async () => {
    const store = create('test_store', 'teste');

    const changeUsername = () => store.update('test');

    const App = () => {
      const { test_store } = useTunnel<{ test_store: string }>(['test_store']);
      return (
        <div>
          <div data-testid="test_value">{test_store}</div>
          <button data-testid="change_test_store" onClick={changeUsername}>
            Change Store Value
          </button>
        </div>
      );
    };

    const wrapper = render(
      <TunnelProvider
        persist
        storesToPersist={['test_store']}
        storage={localStorage}
      >
        <App />
      </TunnelProvider>,
    );

    const { getByTestId } = wrapper;

    expect(getByTestId('test_value').textContent).toBe('teste');

    fireEvent(
      getByTestId('change_test_store'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    await act(() => promise);

    expect(getByTestId('test_value').textContent).toBe('test');
    expect(localStorage.setItem).toBeCalled();

    wrapper.unmount();

    const { getByTestId: remountedByTestId } = render(
      <TunnelProvider
        persist
        storesToPersist={['test_store']}
        storage={localStorage}
      >
        <App />
      </TunnelProvider>,
    );

    await act(() => promise);

    expect(remountedByTestId('test_value').textContent).toBe('test');
    expect(localStorage.getItem).toBeCalled();

    wrapper.unmount();
  });
});
