import {
  ADD_USER,
  DELETE_USER,
  SELECT_USER,
  INCREASE_COUNTER,
} from "../actions/types";

const initialState = {
  userList: [
    /*    {
      id: "1000",
      firstName: "Flavio",
      lastName: "Vieira",
      accessLevel: "A1",
      userPhoto: "",
    },
    {
      id: "1001",
      firstName: "Ana Rosa",
      lastName: "Lemos",
      accessLevel: "VIP",
      userPhoto: "",
    },*/
  ],
  selectedUser: null,
  idCounter: 1000,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userList: state.userList.concat({
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          accessLevel: action.payload.accessLevel,
          userPhoto: action.payload.userPhoto,
        }),
      };
    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter((item) => item.id !== action.payload),
      };
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case INCREASE_COUNTER:
      return {
        ...state,
        idCounter: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
