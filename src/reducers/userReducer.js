import { ADD_USER, DELETE_USER } from "../actions/types";

const initialState = {
  userList: [
    {
      key: Math.random(),
      firstName: "Flavio",
      lastName: "Vieira",
      accessLevel: "blue",
    },
    {
      key: Math.random(),
      firstName: "Ana Rosa",
      lastName: "Lemos",
      accessLevel: "pink",
    },
    {
      key: Math.random(),
      firstName: "Ricardo",
      lastName: "Japonês",
      accessLevel: "green",
    },
  ],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
        //console.log(`action is ${action.user.firstName}`)
        return {
        ...state,
        userList: state.userList.concat({
            key: Math.random(),
            firstName: action.user.firstName,
            lastName: action.user.lastName,
            accessLevel: action.user.accessLevel,
        }),
      };
    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter((item) => item.key !== action.key),
      };
    default:
      return state;
  }
};

export default userReducer;
