import * as React from 'react';
import { AppRegistry } from 'react-native';
import AppNavigation from './navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

export default function App() {
  return (
    <Provider store={store}>
       <AppNavigation/>
    </Provider>
  );
}

