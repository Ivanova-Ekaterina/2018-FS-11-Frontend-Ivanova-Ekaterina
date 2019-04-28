import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    chatList: []
};

const reducer = ( state = initialState, action) => {
    let data = [];
    switch ( action.type ) {
        case actionTypes.GET_CHATS:
            return updateObject(state, {chatList: action.chats})
        case actionTypes.ADD_CHATS:
            return updateObject(state, state.chatList.concat({chatList: action.chats}))
    }
    return state;
};
export default reducer;