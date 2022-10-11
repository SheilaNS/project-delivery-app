import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchLogin from '../api/fetchLogin';
import { readLocal, saveLocal } from '../helpers/localStorage';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [password, setPassword] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [messageError, setMessageError] = useState('');

  const verifyForm = () => {
    const emailFormat = /[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]*\w$/;
    const minSize = 6;
    const isEmailValid = emailFormat.test(email);
    const isPasswordValid = password.length >= minSize;
    setButtonDisabled(!(isEmailValid && isPasswordValid));
  };

  const handleInputChange = async (target) => {
    if (target.name === 'email') setEmail(target.value);
    if (target.name === 'password') setPassword(target.value);
  };

  function navigateTo(path) {
    navigate(path);
  }

  function switchRole(role) {
    switch (role) {
    case 'customer':
      navigateTo('/customer/products');
      break;
    case 'seller':
      navigateTo('/seller/orders');
      break;
    case 'administrator':
      navigateTo('/admin/manage');
      break;
    default:
      navigateTo('/login');
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const { data, status } = await fetchLogin.post({ email, password });
    const STATUS_NUMBER = 404;
    if (status === STATUS_NUMBER) {
      setInvalidLogin(true);
      return setMessageError(data.message);
    }
    setInvalidLogin(false);
    saveLocal('user', data);
    const { role } = data;
    switchRole(role);
  };

  useEffect(() => {
    verifyForm();

    const storeUser = readLocal('user');
    if (storeUser) switchRole(storeUser.role);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  return (
    <div className="Login">
      <form className="login-form">
        <h1>Login</h1>
        <label htmlFor="email">
          <span>Login</span>
          <input
            type="text"
            id="email"
            data-testid="common_login__input-email"
            name="email"
            onChange={ ({ target }) => handleInputChange(target) }
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input
            id="password"
            type="password"
            onChange={ ({ target }) => handleInputChange(target) }
            data-testid="common_login__input-password"
            name="password"
            placeholder="Senha"
          />
        </label>
        <button
          className="login-btn"
          data-testid="common_login__button-login"
          disabled={ isButtonDisabled }
          name="Login"
          onClick={ (e) => handleClick(e) }
          type="submit"
        >
          Login
        </button>
        <button
          className="registre-se"
          data-testid="common_login__button-register"
          name="Cadastra-se"
          onClick={ () => navigateTo('/register') }
          type="submit"
        >
          Cadastra-se
        </button>
      </form>
      { invalidLogin
        && (
          <span data-testid="common_login__element-invalid-email">{messageError}</span>
        )}
    </div>
  );
}

export default Login;
