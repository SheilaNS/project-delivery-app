import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import {
  renderPath,
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

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
    // renderPath('/login');
  });

  it('Os componentes estão na tela', () => {
    renderWithRouter(<App />, { route: '/login' });
    expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(PASS_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(REGISTER_BTN)).toBeInTheDocument();
  });

  it('Os componentes estão na tela', () => {
    const { user, history } = renderWithRouter(<App />, { route: '/login' });
    console.log(user.type())
    console.log(history.location)
    console.log(screen.getAllByTestId(EMAIL_INPUT).values(), 'antes');
    userEvent.type(screen.getAllByTestId(EMAIL_INPUT), ZE_EMAIL);
    console.log(screen.getAllByTestId(EMAIL_INPUT), 'depois');

    expect(screen.getByTestId(EMAIL_INPUT).value).toBe(ZE_EMAIL);
    expect(screen.getByTestId(PASS_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(REGISTER_BTN)).toBeInTheDocument();
  });
});
