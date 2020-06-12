import * as React from "react";
import AccessControl from "./AccessControl";
import { Provider } from "react-redux";

import configureStore from './src/store';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <AccessControl />
    </Provider>
  );
}
