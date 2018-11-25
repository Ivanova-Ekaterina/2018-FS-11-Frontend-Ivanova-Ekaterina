import React, { Component } from 'react';
import {MessageForm} from "../message-form";
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