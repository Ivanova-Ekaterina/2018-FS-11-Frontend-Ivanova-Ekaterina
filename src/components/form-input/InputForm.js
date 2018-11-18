import React, { Component } from 'react';
import './InputForm.css'

export class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', name: props.name, placeholder: props.placeholder, img: false, file: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAttach = this.handleAttach.bind(this);
        this.handleGetPosition = this.handleGetPosition.bind(this);
    }

    handleAttach(event) {
        const url = URL.createObjectURL(event.target.files[0]);
        const ext = event.target.value.split('.');
        let image;
        if ((ext[ext.length - 1] === 'jpg')
            || (ext[ext.length - 1] === 'png')
            || (ext[ext.length - 1] === 'svg'))
        {
            image = true;
        }
        else
        {
            image = false;
        }
        this.setState({file: url, img: image});
    }

    getPosition(option) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, option);
        });
    }

    handleGetPosition(event) {
        if (navigator.geolocation) {
            const Promise = this.getPosition();
            Promise.then((position) => {
                this.setState({value: `Latitude: ${ position.coords.latitude} Longitude: ${position.coords.longitude}`});
                this.handleSubmit();
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit() {
        if ((this.state.value !== '')||(this.state.file !== '')) {
            this.props.updateData(this.state.value, this.state.img, this.state.file);
            this.setState({value: '', img: false, file: ''});
        }
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit } className='forminput'>
                <input type="text" value={ this.state.value } onChange={ this.handleChange } className='input'/>
                <slot className="icons">
                    <div className={this.state.file !== '' ? "indicator_on" : "indicator_off"}/>
                    <label className="filelabel">
                        <div className="icon attach"/>
                        <input type="file" className="file" onInput={this.handleAttach}/>
                    </label>
                    <div className="icon position" onClick={this.handleGetPosition}/>
                </slot>
            </form>
        );
    }
}