import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactRouter from 'react-router';
import fetchLogin from '../api/fetchLogin';
import App from '../App';
import Login from '../pages/login';
import {
  EMAIL_INPUT,
  LOGIN_BTN,
  PASS_INPUT,
  REGISTER_BTN,
  ZE_EMAIL,
  ZE_PASS,
  renderWithRouter,
  ERROR_LOGIN,
  FULANA_EMAIL,
  FULANA_PASS,
  ADM_EMAIL,
  ADM_PASS,
} from './helpers';
import { LOGIN_ADM, LOGIN_CUSTOMER, LOGIN_SELLER, WRONG_LOGIN } from './mocks';

const navigate = jest.fn();

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(ReactRouter, 'useNavigate').mockImplementation(() => navigate);
  });

  afterEach(() => jest.clearAllMocks());

  it('Os componentes estão na tela', () => {
    renderWithRouter(<App />, { route: '/login' });
    expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(PASS_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(REGISTER_BTN)).toBeInTheDocument();
  });

  it('Muda para a tela de produtos quando o login de um consumidor é feito com sucesso', async () => {
    jest.spyOn(fetchLogin, 'post').mockImplementation(() => (LOGIN_CUSTOMER))
    
    renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), ZE_EMAIL);
    userEvent.type(screen.getByTestId(PASS_INPUT), ZE_PASS);
    userEvent.click(screen.getByTestId(LOGIN_BTN));

    expect(screen.getByTestId(EMAIL_INPUT)).toHaveValue(ZE_EMAIL);
    expect(screen.getByTestId(LOGIN_BTN)).not.toBeDisabled();

    await waitFor(() => expect(navigate).toBeCalledWith('/customer/products')); 
  });

  it('Muda para a tela de pedidos quando o login de um vendedor é feito com sucesso', async () => {
    jest.spyOn(fetchLogin, 'post').mockImplementation(() => (LOGIN_SELLER))
    
    renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), FULANA_EMAIL);
    userEvent.type(screen.getByTestId(PASS_INPUT), FULANA_PASS);
    userEvent.click(screen.getByTestId(LOGIN_BTN));

    expect(screen.getByTestId(EMAIL_INPUT)).toHaveValue(FULANA_EMAIL);
    expect(screen.getByTestId(LOGIN_BTN)).not.toBeDisabled();

    await waitFor(() => expect(navigate).toBeCalledWith('/seller/orders')); 
  });

  it('Muda para a tela de gerente quando o login de um admnistrador é feito com sucesso', async () => {
    jest.spyOn(fetchLogin, 'post').mockImplementation(() => (LOGIN_ADM))
    
    renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), ADM_EMAIL);
    userEvent.type(screen.getByTestId(PASS_INPUT), ADM_PASS);
    userEvent.click(screen.getByTestId(LOGIN_BTN));

    expect(screen.getByTestId(EMAIL_INPUT)).toHaveValue(ADM_EMAIL);
    expect(screen.getByTestId(LOGIN_BTN)).not.toBeDisabled();

    await waitFor(() => expect(navigate).toBeCalledWith('/admin/manage')); 
  });

  it('Muda para a tela de registro quando o usuário deseja se cadastrar', async () => {    
    renderWithRouter(<Login />);

    userEvent.click(screen.getByTestId(REGISTER_BTN));

    expect(screen.getByTestId(LOGIN_BTN)).toBeDisabled();

    await waitFor(() => expect(navigate).toBeCalledWith('/register')); 
  });

  it('Should display error message if the login is not successful', async () => {
    jest.spyOn(fetchLogin, 'post').mockImplementation(() => (WRONG_LOGIN));

    renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), 'batatinha@gmail.com');
    userEvent.type(screen.getByTestId(PASS_INPUT), '123456');
    userEvent.click(screen.getByTestId(LOGIN_BTN));

    await waitFor(() => expect(screen.getByTestId(ERROR_LOGIN)).toBeInTheDocument());
  });
});
