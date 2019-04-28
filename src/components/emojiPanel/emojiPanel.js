import React, { Component } from 'react';
import styles from './styles.module.css';
import Emoji from "../emoji/emoji";
export class EmojiPanel extends Component {
    render() {
        const props = this.props;
        return (
            <div className={props.hidden ? `${styles.emojiPanel} ${styles.hidden}`: `${styles.emojiPanel}`} hidden={props.hidden} >
                <Emoji name="smiling-face" hidden={props.hidden} chat={props.chat}/>
                <Emoji name="angry-face" hidden={props.hidden} chat={props.chat}/>
                <Emoji name="avocado" hidden={props.hidden} chat={props.chat}/>
                <Emoji name="bacon" hidden={props.hidden} chat={props.chat}/>
                <Emoji name="green-apple" hidden={props.hidden} chat={props.chat}/>
                <Emoji name="wine-glass" hidden={props.hidden} chat={props.chat}/>
                <Emoji name="pizza" hidden={props.hidden} chat={props.chat}/>
                <Emoji name="hot-pepper" hidden={props.hidden} chat={props.chat}/>
                <Emoji name="broccoli" hidden={props.hidden} chat={props.chat}/>
            </div>
        );
    }
}