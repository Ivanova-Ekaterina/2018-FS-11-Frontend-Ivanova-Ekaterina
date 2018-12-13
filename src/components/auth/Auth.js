import React, {Component} from 'react';
import './auth.css';
import Input from "../Input/Input";
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import * as actionTypes from "../../store/actions/actionTypes";
class Auth extends Component {
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
        event.preventDefault();
        const result = Object
            .keys(this.state.loginForm)
            .reduce((res, key) => {
                res[key] = this.state.loginForm[key].value;
                return res
            }, {});
        this.props.onEnter(result.login, result.password);
        this.props.onAuth(result.login, result.password);
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
                   <button disabled={!this.state.valid} type='submit' onClick={this.handleFormConfirm}>Войти</button>
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
        token: state.auth.token
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);