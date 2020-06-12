import { ADD_USER, DELETE_USER, SELECT_PHOTO } from "./types";

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});

export const deleteUser = (key) => ({
  type: DELETE_USER,
  payload: key,

});

export const selectPhoto = (photo) => ({
  type: SELECT_PHOTO,
  payload: photo,
});