import axios from '@/axios'
let apis = {
  login: '/ftp/file-list',//用户登录
  getfilelist: '',//获取上传文件数据列表
}
export const login = (params) => {
  return axios.get('/api' + apis.login, { data: params })
}
export const getfilelist = (params) => {
  return axios.get('/api' + apis.getfilelist, { data: params })
}