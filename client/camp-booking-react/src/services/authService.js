import api from "./api";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/Auth/login", credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/Auth/register", userData);
    return response.data;
  },
};

export default authService;
