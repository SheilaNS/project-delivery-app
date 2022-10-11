import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactRouter from 'react-router';
import fetchLogin from '../api/fetchLogin';
import App from '../App';
import Login from '../pages/login';
import * as help from './helpers';
import * as data from './mocks';

const navigate = jest.fn();

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(ReactRouter, 'useNavigate').mockImplementation(() => navigate);
  });

  afterEach(() => jest.clearAllMocks());

  it('Os componentes estão na tela', () => {
    help.renderWithRouter(<App />, { route: '/login' });
    expect(screen.getByTestId(help.EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(help.PASS_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(help.LOGIN_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(help.REGISTER_BTN)).toBeInTheDocument();
  });

  it('Muda para a tela de produtos quando o login de um consumidor é feito com sucesso', async () => {
    jest.spyOn(fetchLogin, 'post').mockImplementation(() => (data.LOGIN_CUSTOMER))
    
    help.renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(help.EMAIL_INPUT), help.ZE_EMAIL);
    userEvent.type(screen.getByTestId(help.PASS_INPUT), help.ZE_PASS);
    userEvent.click(screen.getByTestId(help.LOGIN_BTN));

    expect(screen.getByTestId(help.EMAIL_INPUT)).toHaveValue(help.ZE_EMAIL);
    expect(screen.getByTestId(help.LOGIN_BTN)).not.toBeDisabled();

    await waitFor(() => expect(navigate).toBeCalledWith('/customer/products')); 
  });

  it('Muda para a tela de pedidos quando o login de um vendedor é feito com sucesso', async () => {
    jest.spyOn(fetchLogin, 'post').mockImplementation(() => (data.LOGIN_SELLER))
    
    help.renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(help.EMAIL_INPUT), help.FULANA_EMAIL);
    userEvent.type(screen.getByTestId(help.PASS_INPUT), help.FULANA_PASS);
    userEvent.click(screen.getByTestId(help.LOGIN_BTN));

    expect(screen.getByTestId(help.EMAIL_INPUT)).toHaveValue(help.FULANA_EMAIL);
    expect(screen.getByTestId(help.LOGIN_BTN)).not.toBeDisabled();

    await waitFor(() => expect(navigate).toBeCalledWith('/seller/orders')); 
  });

  it('Muda para a tela de gerente quando o login de um admnistrador é feito com sucesso', async () => {
    jest.spyOn(fetchLogin, 'post').mockImplementation(() => (data.LOGIN_ADM))
    
    help.renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(help.EMAIL_INPUT), help.ADM_EMAIL);
    userEvent.type(screen.getByTestId(help.PASS_INPUT), help.ADM_PASS);
    userEvent.click(screen.getByTestId(help.LOGIN_BTN));

    expect(screen.getByTestId(help.EMAIL_INPUT)).toHaveValue(help.ADM_EMAIL);
    expect(screen.getByTestId(help.LOGIN_BTN)).not.toBeDisabled();

    await waitFor(() => expect(navigate).toBeCalledWith('/admin/manage')); 
  });

  it('Muda para a tela de registro quando o usuário deseja se cadastrar', async () => {    
    help.renderWithRouter(<Login />);

    userEvent.click(screen.getByTestId(help.REGISTER_BTN));

    expect(screen.getByTestId(help.LOGIN_BTN)).toBeDisabled();

    await waitFor(() => expect(navigate).toBeCalledWith('/register')); 
  });

  it('O elemento de erro aparece na tela ao tentar fazer login com um e-mail e senha inválidos', async () => {
    jest.spyOn(fetchLogin, 'post').mockImplementation(() => (data.WRONG_LOGIN));

    help.renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(help.EMAIL_INPUT), 'batatinha@gmail.com');
    userEvent.type(screen.getByTestId(help.PASS_INPUT), '123456');
    userEvent.click(screen.getByTestId(help.LOGIN_BTN));

    await waitFor(() => expect(screen.getByTestId(help.ERROR_LOGIN)).toBeInTheDocument());
  });
});
