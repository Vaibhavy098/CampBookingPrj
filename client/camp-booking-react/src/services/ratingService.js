import api from "./api";

const ratingService = {
  create: async (data) => {
    const response = await api.post("/Rating", data);
    return response.data;
  },

  update: async (id, data) => {
    await api.put(`/Rating/${id}`, data);
  },
};

export default ratingService;
