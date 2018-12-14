import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { ChatList } from "./components/chat-list/ChatList";
import {Chat} from "./components/Chat/Chat";
import {Enter} from "./components/Enter/Enter";
import Profile from "./components/Profile/Profile";
import './App.css';
import * as actions from './store/actions';
import connect from "react-redux/es/connect/connect";
import * as actionTypes from "./store/actions/actionTypes";

class App extends Component {
    socket = new WebSocket('ws://localhost:8080');
    componentDidMount() {
        this.props.checkToken();
      //  const socket = new WebSocket('ws://localhost:8080');
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({data: "Hi", chat: "1"}));
            console.log('ok');
        };
        this.socket.onmessage = (message) => {
           let mes =  JSON.parse(message.data);
           console.log(mes);
          this.props.SendMessage(mes.data, mes.chat);
        };

    }
    disableChats(e){
       // if(this.props.isAuthorized === false) {
        if(this.props.token === null) {
            e.preventDefault();
        }
    }
    render() {
        let route =
            (
                <Route path='/enter' exact component={Enter} />
            )
        //if(this.props.isAuthorized === true) {
        if(this.props.token !== null) {
            route = (
                    <Route path='/enter' exact component={Profile} />
            )
        }
        return (
            <Router>
                <div className="startPage">
                    <div className="Head">
                        <div id="upperPanel">
                            <div id="panelButtons">
                                <div id="square" className="rectangle"/>
                                <div id="circle" className="rectangle"/>
                                <div id="triangle"/>
                            </div>
                        </div>
                        <div id="header">
                            <label id="name">Main</label>
                        </div>
                    <ul>
                        <li>
                            <Link to='/enter'>Profile</Link>
                        </li>
                        <li className={this.props.token === null ? 'disable': ''}>
                            <Link to='/chats' onClick={(event) => this.disableChats(event)}>Chats</Link>
                        </li>
                    </ul>
                    </div>
                    {route}
                    <Route exact path='/chats' component={ChatList} />
                    <Route path='/chats/chat1' render={() => <Chat name="Kate" chat="1" socket={this.socket}/>} />
                    <Route path='/chats/chat2' render={() => <Chat name="Sveta" chat="2" socket={this.socket}/>} />
                </div>
            </Router>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
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