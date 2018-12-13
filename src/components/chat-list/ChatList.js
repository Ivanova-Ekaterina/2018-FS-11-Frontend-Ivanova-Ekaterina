import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ChatList.css';

export class ChatList extends Component {
    render() {
        return (
                <div>
                    <div id="upperPanel">
                        <div id="panelButtons">
                            <div id="square" className="rectangle"/>
                            <div id="circle" className="rectangle"/>
                            <div id="triangle"/>
                        </div>
                    </div>
                    <div id="header">
                    <Link to='/'><div id="menu" className="icon"/></Link>
                        <div>
                            <label>Chats</label>
                        </div>
                        <div id="search" className="icon"/>
                    </div>
                    <ul>
                        <li>
                             <Link to='/chats/chat1'>Chat 1</Link>
                        </li>
                        <li>
                            <Link to='/chats/chat2'>Chat 2</Link>
                        </li>
                    </ul>
                </div>
        );
    }
}
