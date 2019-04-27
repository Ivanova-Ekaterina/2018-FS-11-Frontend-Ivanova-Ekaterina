import React, {Component} from 'react';
import styles from './styles.module.css';
import Auth from "../auth/Auth"
import {Link} from "react-router-dom";
export class Enter extends Component {
    render() {
        return (
            <div>
                <div className={styles.upperPanel}>
                    <div className={styles.panelButtons}>
                        <div className={`${styles.rectangle} ${styles.square}`}/>
                        <div className={` ${styles.rectangle} ${styles.circle}`}/>
                        <div className={styles.triangle}/>
                    </div>
                </div>
                <div className={`${styles.EnterHeader} ${styles.header}`}>
                        <Link to ='/' ><div id="back" className={styles.icon} onClick={this.back}/></Link>
                        <label className={styles.header_label}>Sign In</label>
                        <div className={styles.icon}/>
                </div>
                <div className={styles.profile}>
                    <Auth/>
                </div>
            </div>
        );
    }
}