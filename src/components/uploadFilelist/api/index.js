import axios from '@/axios'
let apis = {
  deleteFile:'/ftp/delete-file'
}

export const deleteFile = (params) => {
  return axios.post(`${process.env.VUE_APP_BASE_API}${apis.deleteFile}`, params)
}