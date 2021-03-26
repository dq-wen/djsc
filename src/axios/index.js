import route from "@/router/index";
import { Message } from 'element-ui';
import axios from "axios";
import qs from 'qs';
axios.interceptors.request.use(function (config) {
  const token = window.sessionStorage.getItem("djwjsc_token");
  config.headers["X-Token"] = token;
  config.headers["Content-Type"] =  "application/json; charset=UTF-8";
  return config
});
axios.interceptors.response.use(
  function (response) {
    if (response.headers['content-disposition']) {
      const temp = {}
      temp.data = response.data
      temp.filename = response.headers['content-disposition']
      return temp
    } 
    return response;
  },
  error=>{
    console.log('错误提示',error.response.data)
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
      case 500:
          Message({
            message: errData.msg || '请求错误',
            type: 'error',
            duration: 2000,
          });
        break
      default: 
      return errData;
    }
    
  }
);

export default axios
// export default {
//   post(url, data = {}) {
//     return axios({
//       method: 'post',
//       timeout: 30000,
//       // data: qs.stringify(data),
//       url,
//       data: data,
//       headers:{'Content-Type': 'application/json; charset=UTF-8'}
//     }).then(res => {
//       return res
//     }).catch(err => {
//       return Promise.reject(err)
//     })
//   },

//   delete(url, data = {}) {
//     return axios({
//       method: 'delete',
//       url,
//       timeout: 30000,
//       data: qs.stringify(data),
//       headers:{'Content-Type': 'application/x-www-form-urlencoded'}
//     }).then(res => {
//       return res
//     }).catch(err => {
//       return Promise.reject(err)
//     })
//   },

//   get(url, params = {}) {
//     return axios({
//       method: 'get',
//       url,
//       timeout: 10000,
//       params
//     }).then(res => {
//       return res
//     }).catch(err => {
//       return Promise.reject(err)
//     })
//   },
// }