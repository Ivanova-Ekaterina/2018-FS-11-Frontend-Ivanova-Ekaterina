import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { InputForm } from '../form-input';
import DropZone from 'react-drop-zone';
import './MessageForm.css';


export class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
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


    handleDrop(file)
    {
        this.updateData('', false, file);
    }
    render() {
        return (
            <div className="drop" onSubmit={this.handleSubmit}>
                <ScrollToBottom mode="bottom" className="scroll">
                    <DropZone onDrop={(file, text) => this.handleDrop(file.name)}>
                        {
                            () =>
                    <div className = 'messages'>
                                <div className='friend'>Доброе утро!</div>
                                {this.state.messages.map((mes, index) =>
                                    <div className="result" key={index}>
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
                <InputForm placeholder="Сообщение" className = 'input' updateData={this.updateData}/>
            </div>
        );
    }
}