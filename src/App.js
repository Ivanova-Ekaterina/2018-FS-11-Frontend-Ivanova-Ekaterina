import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { ChatList } from "./components/chat-list/ChatList";
import {Chat} from "./components/Chat/Chat";
import {Profile} from "./components/Profile/Profile";
import './App.css';

class App extends Component {
    render() {
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
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <Link to='/chats'>Chats</Link>
                        </li>
                    </ul>
                    </div>
                    <Route path ='/profile' component={Profile} />
                    <Route exact path='/chats' component={ChatList} />
                    <Route path='/chats/chat1' render={() => <Chat name="Kate"/>} />
                    <Route path='/chats/chat2' render={() => <Chat name="Sveta"/>} />
                </div>
            </Router>
        );
    }
}
export default App;