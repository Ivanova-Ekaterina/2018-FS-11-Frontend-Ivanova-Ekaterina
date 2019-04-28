import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import * as actionTypes from "../../store/actions/actionTypes";
import workerCode from '../../SharedWorker';

class StartPage extends Component {
    disableChats(e){
        var req = {
            reqData: 'get_chats'
        };
        this.state.worker.then((worker)=>{
            console.log(worker);
            worker.port.postMessage(req);
        });
        if(this.props.token === null) {
            e.preventDefault();
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            worker: this.getSharedWorker()
        };
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
    getSharedWorker () {
        const workerFile = new Blob([`(${workerCode})(self)`], {type: 'text/javascript'});
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', (event) => {
                const worker = new SharedWorker(event.target.result);
                worker.port.addEventListener('message', this.onWorkerList.bind(this));
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
    onWorkerList (event) {
        console.log(event.data);
        if (Array.isArray(event.data)) {
            this.props.loadChat(event.data);
        }
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