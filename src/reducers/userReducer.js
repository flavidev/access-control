import { ADD_USER, DELETE_USER, SELECT_PHOTO } from "../actions/types";

const initialState = {
  userList: [
    {
      key: "1000",
      firstName: "Flavio",
      lastName: "Vieira",
      accessLevel: "A1",
      userPhoto: ""
    },
    {
      key: "1001",
      firstName: "Ana Rosa",
      lastName: "Lemos",
      accessLevel: "VIP",
      userPhoto: "",
    },
  ],
  selectedPhoto: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      console.log(action.payload);
      return {
        ...state,
        userList: state.userList.concat({
          key: Math.random().toString().slice(2),
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          accessLevel: action.payload.accessLevel,
        }),
      };
    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter((item) => item.key !== action.key),
      };
    case SELECT_PHOTO:
      return {
        ...state,
        selectedPhoto: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
