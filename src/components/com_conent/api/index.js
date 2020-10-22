import axios from '@/axios'
let apis = {
  uploadFile: '/ftp/upload-file',
  moduleList:'/ftp/module-list',//获取所属模块
  getfilelist: '/ftp/file-list',//获取上传文件数据列表
}
export const uploadFile = (params) => {
  return axios.post(`${process.env.VUE_APP_BASE_API}${apis.uploadFile}`, params)
}
export const moduleList = (params) => {
  return axios.get(`${process.env.VUE_APP_BASE_API}${apis.moduleList}`, {params})
}
export const getfilelist = (params) => {
  return axios.get(`${process.env.VUE_APP_BASE_API}${apis.getfilelist}`, {params})
}