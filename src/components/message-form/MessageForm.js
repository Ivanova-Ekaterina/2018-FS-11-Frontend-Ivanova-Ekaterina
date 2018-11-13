import React, { Component } from 'react';
import { InputForm } from '../form-input';
//controlled components

export class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    updateData = (value, img, file) => {
        let newMessage = {
            content: value,
            user: 'kate',
            key: this.state.id,
            image: img,
            file: file
        };
        let newMessages = this.state.messages;
        newMessages.push(newMessage);
        this.setState({messages: newMessages});
    };

    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <form className="drop">
                    <div className="scroll">
                        <div className = 'messages'>
                            <div className = 'friend'>Доброе утро!</div>
                            {this.state.messages.map((mes, index) =>
                                <div className="result" key={index}>{mes.content + " " + mes.file}</div>
                            )}
                        </div>
                    </div>
                    <InputForm placeholder="Сообщение" className = 'input' updateData={this.updateData}>
                    </InputForm>
                </form>
            </form>
        );
    }
}