import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import InputForm from '../form-input/InputForm';
import DropZone from 'react-drop-zone';
import './MessageForm.css';
import {connect} from 'react-redux';
import * as actionTypes from "../../store/actions/actionTypes";


class MessageForm extends Component {
    handleDrop(file)
    {
        this.props.SendFile(file);
    }
    render() {
        const props = this.props;
        let this_mes = [];
        this.props.messages.forEach(function(mes){
            if (mes.chat === props.chat)
                this_mes.push(mes);
        });
        return (
            <div className="drop">
                <ScrollToBottom mode="bottom" className="scroll">
                    <DropZone onDrop={(file, text) => this.handleDrop(file.name) }>
                        { () =>
                            <div className='messages'>
                                {
                                    this_mes.map((mes, id) =>
                                    <div className={mes.user} key={id}>
                                        {mes.content}
                                        {mes.image === true ?
                                            <img src={mes.file} alt="error" className="imgMessage"/> :
                                            (mes.file === '' ? '' : 'file: ' + mes.file)
                                        }
                                    </div>
                                )}
                            </div>
                        }
                    </DropZone>
                </ScrollToBottom>
                <InputForm placeholder="Сообщение" className = 'input' chat={props.chat} socket={props.socket}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        id: state.msgs.id,
        file: state.msg.file,
        messages: state.msgs.messages
    }
};

const mapDispatchToProps = dispatch => {
    return {
        SendFile: (file) => dispatch({type: actionTypes.SEND_FILE, file})
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);