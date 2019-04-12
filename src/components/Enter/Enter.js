import React, {Component} from 'react';
import './Enter.css';
import Auth from "../auth/Auth"
import {Link} from "react-router-dom";
export class Enter extends Component {
    render() {
        return (
            <div>
                <div id="upperPanel">
                    <div id="panelButtons">
                        <div id="square" className="rectangle"/>
                        <div id="circle" className="rectangle"/>
                        <div id="triangle"/>
                    </div>
                </div>
                <div id="header" className='EnterHeader'>
                        <Link to ='/' ><div id="back" className="icon" onClick={this.back}/></Link>
                        <label className="header_label">Sign In</label>
                        <div className="icon"/>
                </div>
                <div className="profile">
                    <Auth/>
                </div>
            </div>
        );
    }
}