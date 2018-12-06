import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { ChatList } from "./components/chat-list/ChatList";
import {Chat} from "./components/Chat/Chat";
import {Enter} from "./components/Enter/Enter";
import Profile from "./components/Profile/Profile";
import './App.css';
import connect from "react-redux/es/connect/connect";

class App extends Component {
    disableChats(e){
        if(this.props.isAuthorized === false) {
            e.preventDefault();
        }
    }
    render() {
        let route =
            (
                <Route path='/enter' exact component={Enter} />
            );
        if(this.props.isAuthorized === true) {
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
                        <li className={this.props.isAuthorized === false ? 'disable': ''}>
                            <Link to='/chats' onClick={(event) => this.disableChats(event)}>Chats</Link>
                        </li>
                    </ul>
                    </div>
                    {route}
                    <Route exact path='/chats' component={ChatList} />
                    <Route path='/chats/chat1' render={() => <Chat name="Kate"/>} />
                    <Route path='/chats/chat2' render={() => <Chat name="Sveta"/>} />
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

export default connect(mapStateToProps)(App);