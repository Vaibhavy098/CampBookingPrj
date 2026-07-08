import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
// axios instance containing base url, headers, jwt, timeout, interceptors
// axios converts js objects -> json -> http request -> backend -> http response -> json -> js object
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
// console.log("API URL:", import.meta.env.VITE_API_BASE_URL);

// -> Request interceptor: This interceptor is executed before every request is sent. It checks if a JWT token exists in local storage. If it does, the token is attached to the Authorization header of the request. This ensures that all requests to protected endpoints include the necessary authentication credentials.
api.interceptors.request.use(
  (config) => {
    // attach authentication token to the request headers if it exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// -> Response interceptor: This interceptor is executed after a response is received. It checks if the response status is 401 (Unauthorized). If it is, it means the user's session has expired or the token is invalid. In this case, an error message is displayed to the user
//  using a toast notification, and the user is logged out by dispatching the logout action from the Redux store. This ensures that users are informed of session expiration and are redirected to log in again.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default api;
