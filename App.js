import * as React from "react";
import AccessControl from "./AccessControl";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./src/store";

const store = configureStore().store;
const persistor = configureStore().persistor;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate load={null} persistor={persistor}>
        <AccessControl />
      </PersistGate>
    </Provider>
  );
}
