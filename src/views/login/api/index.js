import axios from '@/axios'
let apis = {
  login: '/user/login',//用户登录
  getfilelist: '',//获取上传文件数据列表
}
export const login = (params) => {
  return axios.post('/api' + apis.login, params)
}
export const getfilelist = (params) => {
  return axios.get('/api' + apis.getfilelist, { data: params })
}