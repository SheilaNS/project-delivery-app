import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  renderPath,
  EMAIL_INPUT,
  LOGIN_BTN,
  PASS_INPUT,
  REGISTER_BTN,
  ZE_EMAIL,
  ZE_PASS,
} from './helpers';

const userActions = () => {
  userEvent.type(screen.getAllByTestId(EMAIL_INPUT), ZE_EMAIL);
  userEvent.type(screen.getAllByTestId(PASS_INPUT), ZE_PASS);
  userEvent.click(screen.getAllByTestId(LOGIN_BTN));
};

describe('Login', () => {
  console.log('describe');
  beforeEach(() => {
    localStorage.clear();
    console.log('aqui teste');
    renderPath('/login');
  });

  it('Os componentes estão na tela', () => {
    console.log('aqui it');
    expect(screen.getAllByTestId(EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getAllByTestId(PASS_INPUT)).toBeInTheDocument();
    expect(screen.getAllByTestId(LOGIN_BTN)).toBeInTheDocument();
    expect(screen.getAllByTestId(REGISTER_BTN)).toBeInTheDocument();
  });
});
