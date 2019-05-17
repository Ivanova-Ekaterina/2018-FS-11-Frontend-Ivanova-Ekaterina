import React, { Component } from 'react';
import styles from './styles.module.css';
import {Link} from "react-router-dom";

export class Head extends Component {
    render() {
        const props = this.props;
        return (
            <form>
                <div className={styles.upperPanel}>
                    <div className={styles.panelButtons}>
                        <div className={`${styles.rectangle} ${styles.square}`}/>
                        <div className={`${styles.rectangle} ${styles.circle}`}/>
                        <div className={styles.triangle}/>
                    </div>
                </div>
                <div className={styles.header}>
                    <Link to='/chats' ><div className={`${styles.icon} ${styles.back}`} onClick={this.back}/></Link>
                    <div className={styles.photo}/>
                    <div className={styles.user}>
                        <label className={styles.name}>{props.name}</label>
                        <label className={styles.lastTime}>была 2 часа назад</label>
                    </div>
                    <div className={`${styles.icon} ${styles.search}`}/>
                    <div className={`${styles.icon} ${styles.options}`}/>
                </div>
            </form>
        );
    }
}