import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';

export const renderWithRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) => {
  window.history.pushState({}, 'Test page', route);
  return {
    user: userEvent,
    ...render(ui, { wrapper: BrowserRouter }),
    history,
  };
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
