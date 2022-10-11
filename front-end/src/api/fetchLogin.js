import axios from 'axios';

const fetchLogin = {
  post: async (obj) => {
    const instance = axios.create({
      baseURL: 'http://localhost:3001',
    });
    try {
      const result = await instance.post('/login', obj);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
};

export default fetchLogin;
