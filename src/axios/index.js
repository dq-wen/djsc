import route from "@/router/index";
import axios from "axios";
axios.interceptors.request.use(function (config) {
  const token = window.sessionStorage.getItem("djwjsc_token");
  config.headers["X-Token"] = token;
  config.headers["Content-Type"] =  "application/json; charset=UTF-8";
  return config
});
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  error=>{
    console.log(error)
  }
);

export default axios