import * as ACTION_TYPES from '../actions/actionTypes';

export const initialState = {
  users: [],
  selected_user: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ACTION_TYPES.SET_USER_DETAILS:
      return {
        ...state,
        selected_user: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
