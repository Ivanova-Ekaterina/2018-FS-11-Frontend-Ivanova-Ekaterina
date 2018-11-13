import React, { Component } from 'react';

//controlled components
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
        if (true)
        {
            this.setState({img: true})
        }
        const url = URL.createObjectURL(event.target.files[0]);
        this.setState({file: url});
        this.handleSubmit();
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
                    <div className={this.state.img ? "indicator_on" : "indicator_off"}></div>
                    <label id="filelabel">
                        <div className="icon" id="attach"/>
                        <input type="file" className="file" onInput={this.handleAttach}/>
                    </label>
                    <div className="icon" id="geo" onClick={this.handleGetPosition}/>
                </slot>
            </form>
        );
    }
}