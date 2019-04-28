import React, { Component } from 'react';
import styles from './styles.module.css';
import {connect} from 'react-redux';
import * as actionTypes from "../../store/actions/actionTypes";

class Emoji extends Component {
    addEmoji(event, name, len){
        this.props.AddEmoji(':' + name, len);
    }
    render() {
        const props = this.props;
        return (
            <i className={`${styles[props.name]} ${styles.sprite}`} hidden={props.hidden} onClick={(event) => this.addEmoji(event, props.name, props.value.length)}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        value: state.msg.content,
        id: state.msgs.id,
        messages: state.msgs.messages
    }
};

const mapDispatchToProps = dispatch => {
    return {
        AddEmoji: (text, position) => dispatch({type: actionTypes.ADD_EMOJI, text: text, position: position}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Emoji);