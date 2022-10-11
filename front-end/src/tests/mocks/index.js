import { ADM_EMAIL, FULANA_EMAIL, ZE_EMAIL } from '../helpers';

// LOGIN
export const LOGIN_CUSTOMER = {
  status: 200,
  data: {
    name: 'Cliente Zé Birita',
    email: ZE_EMAIL,
    role: 'customer',
    token: 'any',
  },
};

export const LOGIN_SELLER = {
  status: 200,
  data: {
    name: 'Fulana Pereira',
    email: FULANA_EMAIL,
    role: 'seller',
    token: 'any',
  },
};

export const LOGIN_ADM = {
  status: 200,
  data: {
    name: 'Delivery App Admin',
    email: ADM_EMAIL,
    role: 'administrator',
    token: 'any',
  },
};

export const WRONG_LOGIN = {
  status: 404,
  data: {
    message: 'User not found',
  },
};
