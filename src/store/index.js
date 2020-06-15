import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

const rootReducer = combineReducers({
  userReducer: userReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore = () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
