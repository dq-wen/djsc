import axios from '@/axios'
let apis = {
  fileListPage: '/ftp/file-list-page',//列表分页
  downloadFile:'/ftp/download-file',//下载文件
  fileListRelation:'/ftp/file-list-relation',//是否关联其他表

  getFtpFileInfo:'/ftp/getFtpFileInfo',//下载内容
}
export const fileListPage= (params) => {
  return axios.get(`${process.env.VUE_APP_BASE_API}${apis.fileListPage}`, {params})
}

export const fileListRelation= (params) => {
  return axios.get(`${process.env.VUE_APP_BASE_API}${apis.fileListRelation}`, {params})
}

export const getFtpFileInfo= (params) => {
  return axios.get(`${process.env.VUE_APP_BASE_API}${apis.getFtpFileInfo}`, {params})
}

//下载文件
export const downloadFile= (params) => {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_API}${apis.downloadFile}`, 
    params: params,
    responseType: 'blob',
  })
}
