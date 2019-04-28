import React, {Component} from 'react';
import './Profile.css';
import {Link} from 'react-router-dom';
import * as actionTypes from "../../store/actions/actionTypes";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../store/actions";
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
                    <div className='profile_menu'>
                        <Link to to='/' ><div id="back" className="icon" onClick={this.back}/></Link>
                        <label className="profile_label">Profile</label>
                    </div>
                </div>
                <div className="profile">
                    <label className="userName">{this.props.login !== null ? this.props.login : "Kate"}</label>
                    <div className='photo'/>
                    <label className='userName'>Info</label>
                    <Link to='/'><button type='submit' onClick={this.props.deleteToken}>Выйти</button></Link>
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
       // OnExit: () => dispatch({type: actionTypes.USER_EXIT})
        deleteToken: () => {dispatch(actions.authDeleteState());
                            dispatch({type: actionTypes.DELETE_TOKEN})}
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);