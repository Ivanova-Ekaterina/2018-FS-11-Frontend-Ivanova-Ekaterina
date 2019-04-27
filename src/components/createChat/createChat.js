import React, { Component } from 'react';
import styles from './styles.module.css';
import {Link, Route} from 'react-router-dom';
import * as actionTypes from "../../store/actions/actionTypes";
import connect from "react-redux/es/connect/connect";
import workerCode from "../../SharedWorker";

class CreateChat extends Component {
    state = {
        topic: '',
        nick2: '',
        worker: this.getSharedWorker()
    };
    handleInputNick(event){
        this.setState({nick2: event.target.value});
    }
    handleInputTopic(event){
        this.setState({topic: event.target.value});
    }
    createChat(e, chats, topic, nick2, nick1, add){
        let chat = {
            chat_id: chats.length,
            topic: topic,
            is_group_chat: false
        };
        add([chat]);
        var req = {
            reqData: 'add_chat',
            topic: topic,
            nick1: nick1,
            nick2: nick2
        };
        this.state.worker.then((worker)=>{
            console.log(worker);
            worker.port.postMessage(req);
        });
    }
    render() {
        const props = this.props;
        return (
            <div hidden={props.hidden} className={styles.createChat}>
                <li className={styles.CreateLi}>
                    <label className={styles.labelCreateChat}>Название чата</label>
                <input type="text" onChange={(event) => this.handleInputTopic(event)}/>
                </li>
                <li className={styles.CreateLi}>
                    <label className={styles.labelCreateChat}>Ник участника</label>
                    <input type="text" onChange={(event) => this.handleInputNick(event)}/>
                </li>
                <li className={styles.CreateLi}>
                    <Link to='/'>
                        <button type="submit" onClick={(e) => this.createChat(e, this.props.chats, this.state.topic, this.state.nick2, this.props.nick1, this.props.addChat)}>Создать</button>
                    </Link>
                </li>
            </div>
        );
    }
    getSharedWorker () {
        const workerFile = new Blob([`(${workerCode})(self)`], {type: 'text/javascript'});
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', (event) => {
                const worker = new SharedWorker(event.target.result);
                worker.port.addEventListener('message', this.onWorkerCreateChat.bind(this));
                worker.port.start();
                window.addEventListener('beforeunload', () => {
                    worker.port.postMessage('disconnect');
                });
                res(worker);
            });
            reader.addEventListener('error', rej);
            reader.readAsDataURL(workerFile);
        });
    }
    onWorkerCreateChat (event) {
        console.log(event.data);
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