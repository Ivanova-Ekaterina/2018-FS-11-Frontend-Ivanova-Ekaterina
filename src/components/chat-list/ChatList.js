import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './styles.module.css';
import {connect} from 'react-redux';
import CreateChat from "../createChat/createChat";


class ChatList extends Component {
    state = {
        showCreateChat: true
    };
    handleOpenCreateChat(){
        this.setState({showCreateChat: !this.state.showCreateChat})
    }

    render() {
        const props = this.props;
        let chatItems = [];
        if (props.chats !== undefined) {
            chatItems = props.chats.map((el, id) =>
                <li key={id} className={styles.chat_li}>
                    <Link to={`/chats/${el.topic}`}>{el.topic}</Link>
                </li>
            );
        }
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
                    <Link to='/'><div className={`${styles.icon} ${styles.menu}`}/></Link>
                    <div>
                        <label>Chats</label>
                    </div>
                    <div className={`${styles.icon} ${styles.search}`}/>
                    <div className={`${styles.icon} ${styles.add_chat}`} onClick={(event) => this.handleOpenCreateChat(event)}/>
                </div>
                <CreateChat hidden={this.state.showCreateChat} className={styles.createChat}/>
                <ul className={styles.chatListUl}>
                    {chatItems}
                </ul>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        chats: state.chatList.chatList,
    }
};

export default connect(mapStateToProps)(ChatList);