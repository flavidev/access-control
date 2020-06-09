import { createStore, combineReducers } from 'redux';
import usersReducer from "../reducers/userReducer"

const rootReducer = combineReducers({
  usersReducer: usersReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;