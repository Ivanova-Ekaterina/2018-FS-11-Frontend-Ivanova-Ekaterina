import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ChatList.css';
import * as actionTypes from "../../store/actions/actionTypes";
import {connect} from 'react-redux';
import CreateChat from "../createChat/createChat";


class ChatList extends Component {
    state = {
        showCreateChat: true
    };
    handleOpenCreateChat(){
        this.setState({showCreateChat: !this.state.showCreateChat})
    }

    render() {
        const props = this.props;
        let chatItems = [];
        if (props.chats !== undefined) {
            chatItems = props.chats.map((el, id) =>
                <li key={id}>
                    <Link to={'/chats/' + el.topic}>{el.topic}</Link>
                </li>
            );
        }
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
                        <div id="add_chat" className="icon" onClick={(event) => this.handleOpenCreateChat(event)}/>
                    </div>
                    <CreateChat hidden={this.state.showCreateChat} />
                    <ul className="chatListUl">
                        {chatItems}
                    </ul>
                </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        chats: state.chatList.chatList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        AddChat: (chats) => dispatch({type: actionTypes.GET_CHATS, chats: chats}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
