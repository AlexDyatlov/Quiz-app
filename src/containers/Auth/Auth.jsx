import React, { Component } from 'react';
import is from 'is_js';
import { connect } from 'react-redux';

import classes from './Auth.module.scss';

import Input from '../../components/Ui/Input/Input';
import Button from '../../components/Ui/Button/Button';
import { auth } from '../../store/actions/auth';

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        valid: false,
        touched: false,
        errorMessage: 'Введите корректный email',
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        autoComplete: 'off',
        label: 'Password',
        valid: false,
        touched: false,
        errorMessage: 'Введите корректный пароль',
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  };

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  };
  
  submitHandler = (e) => {
    e.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) return true;

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    };

    if (validation.email) {
      isValid = is.email(value) && isValid;
    };

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    };

    return isValid;
  };

  onChangeHandler = (e, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};
    
    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
  
      return (
        <Input 
          key={`${controlName}_${index}`}
          value={control.value}
          type={control.type}
          autoComplete={control.autoComplete}
          label={control.label}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={e => this.onChangeHandler(e, controlName)}
        />
      ) 
    })
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form className={classes.Auth__Form} onSubmit={this.submitHandler}>
          
            { this.renderInputs() }

            <Button 
              type="success" 
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>

            <Button 
              type="primary" 
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps) (Auth);