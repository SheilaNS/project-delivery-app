import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../../App';
import stateGlobalContext from '../../context/stateGlobalContext';
import StateGlobalProvider from '../../context/StateGlobalProvider';

export const renderPath = (path) => {
  console.log(path);
  console.log('path');
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <StateGlobalProvider value={ stateGlobalContext }>
      <Router history={ history }>
        <App />
      </Router>
    </StateGlobalProvider>,
  );
  return { ...resources, history, stateGlobalContext };
};

export const EMAIL_INPUT = 'common_login__input-email';
export const PASS_INPUT = 'common_login__input-password';
export const LOGIN_BTN = 'common_login__button-login';
export const REGISTER_BTN = 'common_login__button-register';
export const ERROR_LOGIN = 'common_login__element-invalid-email';

export const ZE_EMAIL = 'zebirita@email.com';
export const FULANA_EMAIL = 'fulana@deliveryapp.com';
export const ADM_EMAIL = 'adm@deliveryapp.com';

export const ZE_PASS = '$#zebirita#$';
export const FULANA_PASS = 'fulana@123';
export const ADM_PASS = '--adm2@21!!--';
