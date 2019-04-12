import React, { Component } from 'react';
import './CreateChat.css';
import {Link, Route} from 'react-router-dom';
import * as config from "../../config";
import * as actionTypes from "../../store/actions/actionTypes";
import connect from "react-redux/es/connect/connect";
const axios = require('axios');

function createChats(add, nick1, nick2, topic) {
    axios.get(config.URL +'create_chat_with_user/' + topic + '&' + nick2 + '&' + nick1 , '', {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(res => {
            //console.log(res.data)
            add(res.data);
        })
        .catch(err => {
            console.log(err);
        });
}

class CreateChat extends Component {
    state = {
        topic: '',
        nick2: ''
    };
    handleInputNick(event){
        this.setState({nick2: event.target.value});
    }
    handleInputTopic(event){
        this.setState({topic: event.target.value});
    }
    render() {
        const props = this.props;
        return (
            <div hidden={props.hidden} className="createChat">
                <li className="CreateLi">
                    <label className="labelCreateChat">Название чата</label>
                <input type="text" onChange={(event) => this.handleInputTopic(event)}/>
                </li>
                <li className="CreateLi">
                    <label className="labelCreateChat">Ник участника</label>
                    <input type="text" onChange={(event) => this.handleInputNick(event)}/>
                </li>
                <li className="CreateLi">
                    <Link to={"/chats/"+ this.state.topic}><button type="submit" onClick={() => createChats(this.props.addChat, this.props.nick1, this.state.nick2, this.state.topic)}>Создать</button></Link>
                </li>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chats: state.chatList.chatList,
        nick1: state.user.user
    }
};


const mapDispatchToProps = dispatch => {
    return {
        addChat: (chats) => dispatch({type: actionTypes.ADD_CHATS, chats: chats}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChat);