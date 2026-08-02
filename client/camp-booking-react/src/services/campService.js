import api from "./api";
// converts javascript into HTTP request and sends it to the backend
const campService = {
  search: async (filters) => {
    const response = await api.get("/Camp/search", { params: filters });
    return response.data;
  },
  //Axios interceptors act as global middleware that intercept HTTP requests and responses.
  // They centralize tasks like attaching auth tokens, formatting payloads, and handling global errors without duplicating code across individual API calls
  // Interceptors are used to intercept requests or responses before they are handled by then or catch.
  // In this case, we are using interceptors to add the JWT token to the request headers and handle 401 errors globally.
  // This way, we don't have to add the token manually in every request and we can handle session expiration in one place.

  // if not using axios we could have written the getAll function like this : (clean code, automatic json parsing, better error handling, Interceptors, Request cancellation, default headers, base url, request timeout etc);
  // const response = await fetch("/api/Camp");
  // const data =  await response.json();
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
