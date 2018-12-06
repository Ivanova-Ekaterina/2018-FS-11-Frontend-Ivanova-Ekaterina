import React, {Component} from 'react';
import './Profile.css';
import * as actionTypes from "../../store/actions/actionTypes";
import connect from "react-redux/es/connect/connect";
class Profile extends Component {
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
                    <label className="userName">{this.props.login}</label>
                    <div className='photo'/>
                    <label className='userName'>Info</label>
                    <button type='submit' onClick={this.props.OnExit}>Выйти</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        login: state.user.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        OnExit: () => dispatch({type: actionTypes.USER_EXIT})
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);