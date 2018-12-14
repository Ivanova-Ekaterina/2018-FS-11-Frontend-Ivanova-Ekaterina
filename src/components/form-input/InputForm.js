import React, { Component } from 'react';
import {connect} from 'react-redux';
import './InputForm.css'
import * as actionTypes from '../../store/actions/actionTypes';

 class InputForm extends Component {

    handleAttach(event, chat) {
        const url = URL.createObjectURL(event.target.files[0]);
        const ext = event.target.value.split('.');
        if ((ext[ext.length - 1] === 'jpg')
            || (ext[ext.length - 1] === 'png')
            || (ext[ext.length - 1] === 'svg'))
        {
            this.props.SendImage(url, chat);
        }
        else
        {
            this.props.SendFile(url, chat);
        }
    }

    getPosition(option) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, option);
        });
    }

    handleGetPosition(chat) {
        if (navigator.geolocation) {
            const Promise = this.getPosition();
            Promise.then((position) => {
                this.props.SendMessage(`Latitude: ${ position.coords.latitude} Longitude: ${position.coords.longitude}`, chat);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    render() {
        const props = this.props;
        return (
            <form  className='forminput'  onSubmit={(event) => {event.preventDefault();
                                                                this.props.clearInput();
                                                                if (this.props.value !== ''){
                                                                    this.props.socket.send(JSON.stringify({data: this.props.value, chat: this.props.chat}));
                                                                    this.props.SendMessage(this.props.value, props.chat)}}}>
                <input type="text"  className='input' value={this.props.value} onChange = {(event) => this.props.Input(event.target.value)}/>
                <slot className="icons">
                    <div className={this.props.file !== '' ? "indicator_on" : "indicator_off"}/>
                    <label className="filelabel">
                        <div className="icon attach"/>
                        <input type="file" className="file" onInput={(event) => this.handleAttach(event, props.chat)}/>
                    </label>
                    <div className="icon position" onClick={(event) => this.handleGetPosition(event, props.chat)}/>
                </slot>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {

        value: state.msg.content,
        file: state.msg.file,
        id: state.msgs.id,
        messages: state.msgs.messages
    }
};

const mapDispatchToProps = dispatch => {
    return {
        SendMessage: (text, chat) => dispatch({type: actionTypes.SEND_TEXT, text: text, chat, user: 'me'}),
        clearInput: () => dispatch({type: actionTypes.CLEAR}),
        SendImage: (image, chat) => dispatch({type: actionTypes.SEND_IMAGE, image, chat, user: 'me'}),
        Input: (text) => dispatch({type: actionTypes.INPUT, text: text}),
        SendFile: (file, chat) => dispatch({type: actionTypes.SEND_FILE, file, chat, user: 'me'})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);