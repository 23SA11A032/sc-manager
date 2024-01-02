import axios from "axios";

const api = axios.create({
    headers: {
        Authorization: localStorage.getItem("token"),
    },
});

export default api;
