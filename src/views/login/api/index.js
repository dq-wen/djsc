import axios from '@/axios'
let apis = {
  login: '/user/login',//用户登录
}
export const login = (params) => {
  return axios.post(`${process.env.VUE_APP_BASE_API}${apis.login}`, params)
}