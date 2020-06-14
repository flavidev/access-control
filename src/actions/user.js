import { ADD_USER, DELETE_USER, SELECT_PHOTO, INCREASE_COUNTER } from "./types";

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

export const selectPhoto = (photo) => ({
  type: SELECT_PHOTO,
  payload: photo,
});

export const increaseCounter = (counter) => ({
  type: INCREASE_COUNTER,
  payload: counter
});
