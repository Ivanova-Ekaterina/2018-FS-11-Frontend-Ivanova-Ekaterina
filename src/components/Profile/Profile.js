import React, {Component} from 'react';
import './Profile.css';
export class Profile extends Component {
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
                <div id="header">
                    <div>
                        <label>Profile</label>
                    </div>
                </div>
                <div className="profile">
                </div>
            </div>
        );
    }
}