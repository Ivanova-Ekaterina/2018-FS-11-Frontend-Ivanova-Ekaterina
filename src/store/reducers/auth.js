import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    error: null,
    loading: false,
  }
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAILED: return authFail(state, action);
    case actionTypes.DELETE_TOKEN: return updateObject(state, {token: null});
    default: return state;
  }
};
export default reducer;