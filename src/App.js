import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ChatList from "./components/chat-list/ChatList";
import {Chat} from "./components/Chat/Chat";
import {Enter} from "./components/Enter/Enter";
import Profile from "./components/Profile/Profile";
import './App.css';
import * as actions from './store/actions';
import connect from "react-redux/es/connect/connect";
import * as actionTypes from "./store/actions/actionTypes";
import StartPage from "./components/StartPage/StartPage";
import SignUp from "./components/SignUp/SignUp";

class App extends Component {
    socket = new WebSocket('ws://localhost:8080');
    componentDidMount() {
        this.props.checkToken();
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({data: "Hi", chat: "1", emojiList: []}));
            console.log('ok');
        };
        this.socket.onmessage = (message) => {
            let mes =  JSON.parse(message.data);
            console.log(mes);
            this.props.SendMessage(mes.data, mes.chat, mes.emojiList);
        };

    }
    render() {
        const props = this.props;
        let route =
            (
                <Route exact path='/enter' component={Enter} />
            );
        if(props.token !== null) {
            route = (
                    <Route exact path='/enter' component={Profile} />
            )
        }
        return (
            <Router>
                <div>
                    {route}
                    {console.log("chats", props.chat)}
                    {props.chats !== undefined ?  (props.chats.map((el, id) =>
                        <Route exact path={`/chats/${el.topic}`} render={() => <Chat  key={id} name={el.topic} chat={el.id} socket={this.socket}/>} />))
                     : ''}
                    <Route exact path='/' component={StartPage} />
                    <Route exact path='/chats' component={ChatList} />
                    <Route exact path='/singUp' component={SignUp} />
                </div>
            </Router>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        chats: state.chatList.chatList,
        isAuthorized: state.user.isAuthorized
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        checkToken: () => dispatch(actions.authCheckState()),
        SendMessage: (message, chat) => dispatch({type: actionTypes.SEND_TEXT, text: message, chat, user: "friend"})
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);