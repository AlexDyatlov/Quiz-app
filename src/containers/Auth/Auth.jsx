import React, { Component } from 'react';

import classes from './Auth.module.scss';

import Input from '../../components/Ui/Input/Input';
import Button from '../../components/Ui/Button/Button';

export default class Auth extends Component {

  loginHandler = () => {

  };

  registerHandler = () => {

  };
  
  submitHandler = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form className={classes.Auth__Form} onSubmit={this.submitHandler}>
            <Input label="Email" />
            <Input 
              label="Пароль"
              errorMessage={' '}
            />

            <Button 
              type="success" 
              onClick={this.loginHandler}
            >
              Войти
            </Button>

            <Button 
              type="primary" 
              onClick={this.registerHandler}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
};