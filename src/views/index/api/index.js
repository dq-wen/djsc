import axios from '@/axios'
let apis = {
  uploadFile: '/ftp/upload-file',
  moduleList:'/ftp/module-list',//获取所属模块
  getfilelist: '/ftp/file-list',//获取上传文件数据列表
}
export const uploadFile = (params) => {
  return axios.post('/api' + apis.uploadFile, params)
}
export const moduleList = (params) => {
  return axios.get('/api' + apis.moduleList, {params})
}
export const getfilelist = (params) => {
  return axios.get('/api' + apis.getfilelist, {params})
}