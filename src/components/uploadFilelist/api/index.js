import axios from '@/axios'
let apis = {
  deleteFile:'/ftp/delete-file',
  updateStatus:'/fill-status-info/update-status'
}

export const deleteFile = (params) => {
  return axios.post(`${process.env.VUE_APP_BASE_API}${apis.deleteFile}`, params)
}

//更新全表是否填报信息
export const updateStatus = (params) => {
  return axios.get(`${process.env.VUE_APP_BASE_API}${apis.updateStatus}`, {params})
}