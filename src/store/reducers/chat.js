import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    messages: [],
    name: '',
    new_messages: 0,
    id: 0
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SEND_FILE:
            return updateObject(state, {messages: state.messages.concat({
                    key: state.id + 1,
                    user: 'kate',
                    image: '',
                    content: '',
                    file: action.file
            })});
        case actionTypes.SEND_IMAGE:
            return updateObject(state, {messages: state.messages.concat({
                    key: state.id + 1,
                    user: 'kate',
                    image: true,
                    content: '',
                    file: action.image
        })});
        case actionTypes.SEND_TEXT:
            return updateObject(state, {messages: state.messages.concat({
                    key: state.id + 1,
                    user: 'kate',
                    image: '',
                    content: action.text,
                    file: ''
                })});
    }
    return state;
};

export default reducer;