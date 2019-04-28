import React, {Component} from 'react';
import './SignUp.css';
import {Link, Route} from 'react-router-dom';
import Input from "../Input/Input";
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import * as actionTypes from "../../store/actions/actionTypes";
import * as config from "../../config";
const axios = require('axios');
function createUser(nick, name) {
    axios.get(config.URL +'create_user/' + nick + '&' + name, '', {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        });
}

class SignUp extends Component {
    state = {
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
      //  event.preventDefault();
        const result = Object
            .keys(this.state.loginForm)
            .reduce((res, key) => {
                res[key] = this.state.loginForm[key].value;
                return res
            }, {});
        this.props.onEnter(result.login, result.password);
        createUser(result.login, result.password);
        this.props.onAuth(result.login, result.password);
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
            <div>
                <div id="upperPanel">
                    <div id="panelButtons">
                        <div id="square" className="rectangle"/>
                        <div id="circle" className="rectangle"/>
                        <div id="triangle"/>
                    </div>
                </div>
                <div id="header">
                    <div className="signUpHeader">
                        <Link to ='/' ><div id="back" className="icon" onClick={this.back}/></Link>
                        <label>Sign Up</label>
                        <div className="icon"/>
                    </div>
                </div>
                <div className="profile">
                    <div className='sign'>
                        {inputs}
                        <div className='sign_in'>
                            <Link to = '/enter' ><button type='submit'onClick={this.handleFormConfirm}> Регистрация</button></Link>
                    </div>
                    </div>
                </div>
            </div>
        );
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