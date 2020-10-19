import axios from '@/axios'
let apis = {
  uploadFile: '/ftp/upload-file',
  getfilelist: '/ftp/file-list',//获取上传文件数据列表
}
export const uploadFile = (params) => {
  return axios.post('/api' + apis.uploadFile, params)
}
export const getfilelist = (params) => {
  return axios.get('/api' + apis.getfilelist, {params})
}