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
} from './helpers';

const userActions = () => {
  userEvent.type(screen.getAllByTestId(EMAIL_INPUT), ZE_EMAIL);
  userEvent.type(screen.getAllByTestId(PASS_INPUT), ZE_PASS);
  userEvent.click(screen.getAllByTestId(LOGIN_BTN));
};

const navigate = jest.fn();

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(ReactRouter, 'useNavigate').mockImplementation(() => navigate);
  });

  it('Os componentes estão na tela', () => {
    renderWithRouter(<App />, { route: '/login' });
    expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(PASS_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(REGISTER_BTN)).toBeInTheDocument();
  });

  it('Muda para a tela de produtos quando o login é feito com sucesso', async () => {
    jest.spyOn(fetchLogin, 'post').mockImplementation(() => ({
      status: 200,
      data: {
        name: 'Zé Birita',
        email: ZE_EMAIL,
        role: 'customer',
        token: 'any',
      }}))
    
    renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), ZE_EMAIL);
    expect(screen.getByTestId(EMAIL_INPUT)).toHaveValue(ZE_EMAIL);
    userEvent.type(screen.getByTestId(PASS_INPUT), ZE_PASS);
    userEvent.click(screen.getByTestId(LOGIN_BTN));
    expect(screen.getByTestId(LOGIN_BTN)).not.toBeDisabled();

    await waitFor(() => expect(navigate).toBeCalled()); 
  });
});
