import api from "./api";

const campService = {
  search: async (filters) => {
    const response = await api.get("/Camp/search", { params: filters });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/Camp");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/Camp/${id}`);
    return response.data;
  },
};

export default campService;
