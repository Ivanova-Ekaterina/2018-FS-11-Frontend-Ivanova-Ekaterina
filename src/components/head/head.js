import React, { Component } from 'react';
//controlled components
export class Head extends Component {
    render() {
        return (
            <form>
                <div id="upperPanel">
                    <div id="panelButtons">
                        <div id="square" className="rectangle"></div>
                        <div id="circle" className="rectangle"></div>
                        <div id="triangle"></div>
                    </div>
                </div>
                <div id="header">
                    <div id="back" className="icon"></div>
                    <div id="photo"></div>
                    <div id="user">
                        <label id="name">Дженнифер</label>
                        <label id="lastTime">была 2 часа назад</label>
                    </div>
                    <div id="search" className="icon"></div>
                    <div id="options" className="icon"></div>
                </div>
            </form>
        );
    }
}