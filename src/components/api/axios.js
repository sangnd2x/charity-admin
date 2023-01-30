import axios from "axios";

const axiosReq = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    // 'authorization': 'Bearer' + localStorage.getItem('token');
    'Content-type': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
});

export default axiosReq;