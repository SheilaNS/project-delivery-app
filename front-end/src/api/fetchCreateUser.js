import axios from 'axios';

const fetchCreateUser = {
  post: async (obj) => {
    const instace = axios.create({
      baseURL: 'http://localhost:3001',
    });
    try {
      const result = await instace.post(
        '/users',
        obj,
      );
      return result;
    } catch (error) {
      return error.response;
    }
  },
};

export default fetchCreateUser;
