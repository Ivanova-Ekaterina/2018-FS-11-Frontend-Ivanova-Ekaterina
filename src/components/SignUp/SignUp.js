import React, {Component} from 'react';
import styles from './styles.module.css';
import {Link, Route} from 'react-router-dom';
import Input from "../Input/Input";
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import * as actionTypes from "../../store/actions/actionTypes";
import workerCode from "../../SharedWorker";

class SignUp extends Component {
    state = {
        worker: this.getSharedWorker(),
        loginForm: {
            login: {
                label: 'Введите логин',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Логин'
                },
                value: '',
                valid: false,
                touched: false,
                type: "",
                validation: {
                    isRequired: true,
                    minLength: 6,
                }
            },
            name: {
                elementType: 'input',
                value: '',
                label: 'Введите имя',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Имя'
                },
                touched: false,
                valid: false,
                type: "text",
                validation: {
                    isRequired: true,
                }
            },
            password: {
                elementType: 'input',
                value: '',
                label: 'Введите пароль',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Пароль'
                },
                touched: false,
                valid: false,
                type: "password",
                validation: {
                    isRequired: true,
                }
            }
        },
        valid: false,
    };
    checkValidity = (value, rule) => {
        let isValid = true;
        if (rule.isRequired) {
            isValid = value.trim()!== '';
        }
        if (rule.minLength) {
            isValid = value.trim().length >= rule.minLength && isValid;
        }
        return isValid;
    };

    handleInput = (event, key) => {
        const newFormData ={
            ...this.state.loginForm
        };
        const InputData = {
            ...this.state.loginForm[key]
        };
        InputData.touched = true;
        InputData.value = event.target.value;
        InputData.valid = this.checkValidity(InputData.value, InputData.validation);
        const invalid = Object.keys(newFormData).some(key => {
            return !newFormData[key].valid;
        });
        newFormData[key]= InputData;
        this.setState({loginForm: newFormData,
            valid: !invalid});
    };

    handleFormConfirm = (event) => {
        const result = Object
            .keys(this.state.loginForm)
            .reduce((res, key) => {
                res[key] = this.state.loginForm[key].value;
                return res
            }, {});
        this.props.onEnter(result.login, result.password);
        this.createUser(result.login, result.name);
        this.setState({user : result.login});
        this.props.onAuth(result.login, result.password);
    };
    createUser(nick, name){
        let req = {
            reqData: 'create_user',
            nick: nick,
            name: name
        };
        this.state.worker.then((worker)=>{
            console.log(worker);
            worker.port.postMessage(req);
        });
    };
    render() {
        const inputs = Object
            .keys(this.state.loginForm)
            .map(key => {
                const element =  this.state.loginForm[key];
                return  <Input
                    key={key}
                    elementType={element.elementType}
                    value={element.value}
                    type={element.type}
                    label={element.label}
                    changed={(event) => this.handleInput(event, key)}
                    placeholder={element.elementConfig.placeholder}/>
            });
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
                    <div className={styles.signUpHeader}>
                        <Link to ='/' ><div id="back" className={styles.icon} onClick={this.back}/></Link>
                        <label>Sign Up</label>
                        <div className={styles.icon}/>
                    </div>
                </div>
                <div className={styles.profile}>
                    <div className={styles.sign}>
                        {inputs}
                        <div className={styles.sign_in}>
                            <Link to = '/enter' ><button type='submit'onClick={this.handleFormConfirm}> Регистрация</button></Link>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
    getSharedWorker () {
        const workerFile = new Blob([`(${workerCode})(self)`], {type: 'text/javascript'});
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', (event) => {
                const worker = new SharedWorker(event.target.result);
                worker.port.addEventListener('message', this.onWorkerCreateUser.bind(this));
                worker.port.start();
                window.addEventListener('beforeunload', () => {
                    worker.port.postMessage('disconnect');
                });
                res(worker);
            });
            reader.addEventListener('error', rej);
            reader.readAsDataURL(workerFile);
        });
    }
    onWorkerCreateUser (event) {
        console.log('User', event.data);
    }
}

const mapDispatchToProps = (dispatch) => {
    return  {
        onAuth: (login, password) => dispatch(actions.auth(login, password)),
        onEnter: (login, password) => dispatch({type: actionTypes.USER_ENTER, login, password})
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.user.user
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);