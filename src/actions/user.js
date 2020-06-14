import { ADD_USER, DELETE_USER, SELECT_USER, INCREASE_COUNTER } from "./types";

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

export const selectUser = (id) => ({
  type: SELECT_USER,
  payload: id,
});

export const increaseCounter = (counter) => ({
  type: INCREASE_COUNTER,
  payload: counter
});
