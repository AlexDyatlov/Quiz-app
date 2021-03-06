import axios from "axios";

import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes";

const API_SIGNUP = process.env.REACT_APP_REGISTER_API_KEY;
const API_SIGNIN = process.env.REACT_APP_LOGIN_API_KEY;

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = API_SIGNUP;

    if (isLogin) {
      url = API_SIGNIN;
    }
    
    const response = await axios.post(url, authData);
    const data = response.data;

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(authSuccess(data.idToken))
    dispatch(authLogout(data.expiresIn))
  }
};

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
};

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')

    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      };
    };
  }
};

export function authLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
};

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')

  return {
    type: AUTH_LOGOUT
  }
};