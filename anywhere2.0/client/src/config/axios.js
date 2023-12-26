import Axios from "axios";
const axios = Axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",
    "Authorization":`Bearer ${getAcessToken()}`
  },
});


function getAcessToken(){
  return sessionStorage.getItem("anywhere-access-token")
}

export default axios;
