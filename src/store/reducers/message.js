import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    key: 0,
    user: 'kate',
    image: '',
    content: '',
    emojiList: [],
    file: ''
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CLEAR:
            return updateObject(state, {content: '', file: '', image: '', emojiList: []});
        case actionTypes.INPUT:
            return updateObject(state, {content: action.text, file: '', image: ''});
        case actionTypes.ADD_EMOJI:
            return updateObject(state, {content: state.content + action.text, file: '', image: '', emojiList: state.emojiList.concat({name: action.text, position: action.position})});
        default:
            return state;
    }
};

export default reducer;