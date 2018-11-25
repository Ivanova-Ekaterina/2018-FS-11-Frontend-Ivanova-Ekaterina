import React, { Component } from 'react';
import './head.css'

export class Head extends Component {
    render() {
        const props = this.props;
        return (
            <form>
                <div id="upperPanel">
                    <div id="panelButtons">
                        <div id="square" className="rectangle"/>
                        <div id="circle" className="rectangle"/>
                        <div id="triangle"/>
                    </div>
                </div>
                <div id="header">
                    <div id="back" className="icon"/>
                    <div id="photo"/>
                    <div id="user">
                        <label id="name">{props.name}</label>
                        <label id="lastTime">была 2 часа назад</label>
                    </div>
                    <div id="search" className="icon"/>
                    <div id="options" className="icon"/>
                </div>
            </form>
        );
    }
}