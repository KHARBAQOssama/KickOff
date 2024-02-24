import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "https://api.sportmonks.com/v3/football/",
  headers: {
    Authorization:
      "tYgX0otkxc857iGQk2dAVFYOiNCNGi9Qr2sUH40UVpHphNDjdeIdXvrRwb4I",
  },
});

export default api;