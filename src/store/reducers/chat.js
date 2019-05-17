import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    messages: [],
    name: 'me',
    new_messages: 0,
    id: 0
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SEND_FILE:
            return updateObject(state, {messages: state.messages.concat({
                    key: state.id + 1,
                    user: action.user,
                    chat: action.chat,
                    image: '',
                    content: '',
                    file: action.file,
                    emojiList: []
            })});
        case actionTypes.SEND_IMAGE:
            return updateObject(state, {messages: state.messages.concat({
                    key: state.id + 1,
                    user: action.user,
                    chat: action.chat,
                    image: true,
                    content: '',
                    file: action.image,
                    emojiList: []
        })});
        case actionTypes.SEND_TEXT:
            return updateObject(state, {messages: state.messages.concat({
                    key: state.id + 1,
                    user: action.user,
                    chat: action.chat,
                    image: '',
                    content: action.text,
                    file: '',
                    emojiList: action.emojiList
                })});
        default:
            return state;
    }
};

export default reducer;