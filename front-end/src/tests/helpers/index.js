import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import StateGlobalProvider from '../../context/StateGlobalProvider';

export const renderWithRouter = (
  ui,
  route = '/',
  renderOptions = {},
) => {
  const history = createMemoryHistory();

  const wrapper = ({ children }) => (
    <MemoryRouter history={ history } initialEntries={ [route] }>
      <StateGlobalProvider>
        {children}
      </StateGlobalProvider>
    </MemoryRouter>
  );
  return {
    ...history,
    ...render(ui, { wrapper, ...renderOptions }),
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
