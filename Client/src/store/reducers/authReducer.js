import * as ACTION_TYPES from '../actions/actionTypes';

export const initialState = {
  user: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.REMOVE_LOGGEDIN_USER:
      return {
        user: null,
      };
    case ACTION_TYPES.SET_LOGGEDIN_USER:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
