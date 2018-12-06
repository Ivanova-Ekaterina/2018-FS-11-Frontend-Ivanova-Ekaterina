import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import userReducer from './store/reducers/user';
import chatReducer from './store/reducers/chat';
import chatListReducer from './store/reducers/chatList';
import chatMessageReducer from './store/reducers/message';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
    user: userReducer,
    msgs: chatReducer,
    chatList: chatListReducer,
    msg: chatMessageReducer,
    auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(<Provider store={store}><App /></Provider>,  document.getElementById('app'));

