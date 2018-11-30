import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    key: 0,
    user: 'kate',
    image: '',
    content: '',
    file: ''
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CLEAR:
            return updateObject(state, {content: '', file: '', image: ''});
        case actionTypes.INPUT:
            return updateObject(state, {content: action.text, file: '', image: ''});
    }
    return state;
};

export default reducer;