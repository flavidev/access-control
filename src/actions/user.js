import { ADD_USER, DELETE_USER } from "./types";

export const addUser = (user) => ({
  type: ADD_USER,
  user: user
});

export const deleteUser = (key) => ({
  type: DELETE_USER,
  key: key,
});
