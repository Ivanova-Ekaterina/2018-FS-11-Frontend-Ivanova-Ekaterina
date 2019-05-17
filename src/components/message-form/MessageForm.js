import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import InputForm from '../form-input/InputForm';
import DropZone from 'react-drop-zone';
import styles from './styles.module.css';
import {connect} from 'react-redux';
import * as actionTypes from "../../store/actions/actionTypes";
import Emoji from "../emoji/emoji";

class MessageForm extends Component {
    handleDrop(file)
    {
        this.props.SendFile(file);
    }
    render() {
        const props = this.props;
        let this_mes = [];
        let this_emoji = [];
        this.props.messages.forEach(function(mes){
            if (mes.chat === props.chat) {
                this_mes.push(mes);
                this_emoji.push(mes.emojiList);
            }
        });
        return (
            <div className={styles.drop}>
                <ScrollToBottom mode="bottom" className={styles.scroll}>
                    <DropZone onDrop={(file) => this.handleDrop(file.name) }>
                        { () =>
                            <div className={styles.messages}>
                                {
                                    this_mes.map((mes, id) =>
                                    <div className={styles[mes.user]} key={id}>

                                        {mes.emojiList.length !== 0 ? mes.content.substring(0, this_emoji[id][0].position): mes.content}
                                        {this_emoji[id].map((em, iid,arr) =>
                                            <div className={styles.emojiClass} key={iid}>
                                                <Emoji name={em.name.substring(1)}/><label className={styles.emojiLabel}>
                                                    {mes.content.substring(arr[iid].position, iid !== arr.length - 1? arr[iid+1].position: mes.content.length).replace(em.name, '')}
                                                </label>
                                            </div>)}
                                       {mes.image === true ?
                                            <img src={mes.file} alt="error" className={styles.imgMessage}/> :
                                            (mes.file === '' ? '' : 'file: ' + mes.file)
                                        }
                                    </div>
                                )}
                            </div>
                        }
                    </DropZone>
                </ScrollToBottom>
                <InputForm placeholder="Сообщение" className = {styles.input} chat={props.chat} socket={props.socket}/>
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