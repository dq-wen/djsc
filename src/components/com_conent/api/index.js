import axios from '@/axios'
let apis = {
  uploadFile: '/ftp/upload-file',
  moduleList:'/ftp/module-list',//获取所属模块
  getfilelist: '/ftp/file-list',//获取上传文件数据列表
  downModelList:'/ftp/model-list',//获取下载模板文件
  downloadFile:'/ftp/download-file'//下载文件
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

export const downModelList= (params) => {
  return axios.get(`${process.env.VUE_APP_BASE_API}${apis.downModelList}`, {params})
}

export const downloadFile= (params) => {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_API}${apis.downloadFile}`, 
    params: params,
    responseType: 'blob',
  })
}