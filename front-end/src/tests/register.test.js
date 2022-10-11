import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactRouter from 'react-router';
import fetchCreateUser from '../api/fetchCreateUser';
import Register from '../pages/register';
import * as help from './helpers';
import * as data from './mocks';

const navigate = jest.fn();

describe('Register', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(ReactRouter, 'useNavigate').mockImplementation(() => navigate);
  });

  afterEach(() => jest.clearAllMocks());

  it('Os componentes estão na tela', () => {
    help.renderWithRouter(<Register />);
    expect(screen.getByTestId(help.NAME_REG)).toBeInTheDocument();
    expect(screen.getByTestId(help.EMAIL_REG)).toBeInTheDocument();
    expect(screen.getByTestId(help.PASS_REG)).toBeInTheDocument();
    expect(screen.getByTestId(help.BTN_REG)).toBeInTheDocument();
  });

  it('Muda para a tela de produtos quando um novo registro é feito com sucesso', async () => {
    jest.spyOn(fetchCreateUser, 'post').mockImplementation(() => (data.NEW_USER))
    
    help.renderWithRouter(<Register />);

    userEvent.type(screen.getByTestId(help.NAME_REG), help.NEW_NAME);
    userEvent.type(screen.getByTestId(help.EMAIL_REG), help.NEW_EMAIL);
    userEvent.type(screen.getByTestId(help.PASS_REG), help.NEW_PASS);
    userEvent.click(screen.getByTestId(help.BTN_REG));

    expect(screen.getByTestId(help.EMAIL_REG)).toHaveValue(help.NEW_EMAIL);
    expect(screen.getByTestId(help.BTN_REG)).not.toBeDisabled();

    await waitFor(() => expect(navigate).toBeCalledWith('/customer/products')); 
  });

  it('O elemento de erro aparece na tela ao tentar fazer login com um e-mail e senha inválidos', async () => {
    jest.spyOn(fetchCreateUser, 'post').mockImplementation(() => (data.WRONG_REG));

    help.renderWithRouter(<Register />);

    userEvent.type(screen.getByTestId(help.NAME_REG), 'Maria da Silva');
    userEvent.type(screen.getByTestId(help.EMAIL_REG), help.NEW_EMAIL);
    userEvent.type(screen.getByTestId(help.PASS_REG), help.NEW_PASS);
    userEvent.click(screen.getByTestId(help.BTN_REG));

    await waitFor(() => expect(screen.getByTestId(help.ERROR_REG)).toBeInTheDocument());
  });
});
