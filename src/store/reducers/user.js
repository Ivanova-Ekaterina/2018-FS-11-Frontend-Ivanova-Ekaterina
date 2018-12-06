import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    user: null,
    password: null,
    isAuthorized: false
};

const reducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case actionTypes.USER_ENTER:
            return updateObject(state, {user: action.login, password: action.password, isAuthorized: true});
        case actionTypes.USER_EXIT:
            return updateObject(state, {user: null, password: null, isAuthorized: false});
    }
    return state;
};

export default reducer;