import * as ACTION_TYPES from '../actions/actionTypes';

export const initialState = {
  projects: [],
  selected_project: null,
};

const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ACTION_TYPES.SET_PROJECT_DETAILS:
      return {
        ...state,
        selected_project: action.payload,
      };
    default:
      return state;
  }
};

export default ProjectReducer;
