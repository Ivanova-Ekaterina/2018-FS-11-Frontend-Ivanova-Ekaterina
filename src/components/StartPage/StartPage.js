import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import * as actionTypes from "../../store/actions/actionTypes";
import * as config from "../../config"
const axios = require('axios');

function getChats(add) {
    axios.get(config.URL +'get_chats_list', '', {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(res => {
            if (res.data instanceof Array){
                add(res.data);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

class StartPage extends Component {
    disableChats(e){
        getChats(this.props.loadChat);
        // if(this.props.isAuthorized === false) {
        if(this.props.token === null) {
            e.preventDefault();

        }
    }
    render() {
        const props = this.props;
        return (
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
                        <li className={props.token === null ? 'disable': ''}>
                            <Link to='/chats' onClick={(event) => this.disableChats(event)}>Chats</Link>
                        </li>
                    </ul>
                </div>
            </div>
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


const mapDispatchToProps = dispatch => {
    return {
        loadChat: (chats) => dispatch({type: actionTypes.GET_CHATS, chats: chats}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);