import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers} from 'redux';

import App from './App';
import userReducer from './store/reducers/user';
import chatReducer from './store/reducers/chat';
import chatListReducer from './store/reducers/chatList';
import chatMessageReducer from './store/reducers/message';

const rootReducer = combineReducers({
    user: userReducer,
    msgs: chatReducer,
    chatList: chatListReducer,
    msg: chatMessageReducer
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>,  document.getElementById('app'));

