import React, { Component } from 'react';
import MessageForm from "../../components/message-form/MessageForm";
import {Head} from "../head";
export class Chat extends Component {
    render() {
        const props = this.props;
        return (
            <div>
                <Head name={props.name}/>
                <MessageForm/>
            </div>
        );
}
}