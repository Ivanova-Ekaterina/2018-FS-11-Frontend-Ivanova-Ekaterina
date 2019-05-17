import React, {Component} from 'react';
import styles from './styles.module.css';
import {Link} from 'react-router-dom';
import * as actionTypes from "../../store/actions/actionTypes";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../store/actions";
class Profile extends Component {
    render() {
        return (
            <div>
                <div className={styles.upperPanel}>
                    <div className={styles.panelButtons}>
                        <div className={`${styles.rectangle} ${styles.square}`}/>
                        <div className={`${styles.rectangle} ${styles.circle}`}/>
                        <div className={styles.triangle}/>
                    </div>
                </div>
                <div className={styles.header}>
                    <div className={styles.profile_menu}>
                        <Link to='/' ><div className={`${styles.icon} ${styles.back}`} onClick={this.back}/></Link>
                        <label className={styles.profile_label}>Profile</label>
                    </div>
                </div>
                <div className={styles.profile}>
                    <label className={styles.userName}>{this.props.login !== null ? this.props.login : "Kate"}</label>
                    <div className={styles.photo}/>
                    <label className={styles.userName}>Info</label>
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
        deleteToken: () => {dispatch(actions.authDeleteState());
                            dispatch({type: actionTypes.DELETE_TOKEN})}
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);