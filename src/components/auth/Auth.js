import React, {Component} from 'react';
import styles from './styles.module.css';
import {Link} from 'react-router-dom';
import Input from "../Input/Input";
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import * as actionTypes from "../../store/actions/actionTypes";
import workerCode from "../../SharedWorker";


function vk_auth() {

}
class Auth extends Component {
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
                    minLength: 2,
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
    findUser(nick) {
        const req = {
            reqData: 'find_user',
            nick: nick
        };
        this.state.worker.then((worker)=>{
            console.log(worker);
            worker.port.postMessage(req);
        });
    }
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
        event.preventDefault();
        const result = Object
            .keys(this.state.loginForm)
            .reduce((res, key) => {
                res[key] = this.state.loginForm[key].value;
                return res
            }, {});
        this.props.onEnter(result.login, result.password);
        this.findUser(result.login);
        this.setState({user : result.login});

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
               <div className='auth'>
                   {inputs}
                   <div className={styles.vk_auth}>
                   <button disabled={!this.state.valid} type='submit' onClick={this.handleFormConfirm}>Войти</button>

                       <label className={styles.vk_label}>Войти с помощью</label>
                       <div className={styles.vk_img} onClick={vk_auth()}/>

                   <div className={styles.sign_up}>
                       <Link to='/singUp'><button type='submit'>Регистрация</button></Link>
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
                worker.port.addEventListener('message', this.onWorkerFindUser.bind(this));
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
    onWorkerFindUser (event) {

        console.log('Auth', event.data);
        if (event.data.user_id === undefined)
        {
            this.props.deleteToken();
        }
        else {
            this.props.onAuth(this.state.loginForm.login, this.state.loginForm.password);
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return  {
        onAuth: (login, password) => dispatch(actions.auth(login, password)),
        onEnter: (login, password) => dispatch({type: actionTypes.USER_ENTER, login, password}),
        deleteToken: () => {dispatch(actions.authDeleteState());
            dispatch({type: actionTypes.DELETE_TOKEN})}
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.user.user
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);