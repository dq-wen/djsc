import route from "@/router/index";
import { Message } from 'element-ui';
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
    console.log(error.response.data)
    const errData = error.response.data;
    switch(errData.code){
      case 401:
        Message({
          message: errData.msg || '请求错误',
          type: 'error',
          duration: 2000,
        });
        route.push({path:'/login'});
        sessionStorage.clear();
      break
    }
    
  }
);

export default axios