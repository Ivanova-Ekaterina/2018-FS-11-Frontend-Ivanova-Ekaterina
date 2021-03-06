import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    chatList: []
};

const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.GET_CHATS:
            return updateObject(state, {chatList: action.chats});
        case actionTypes.ADD_CHATS:
            return updateObject(state, state.chatList.concat({chatList: action.chats}));
        default:
            return state;
    }
};
export default reducer;