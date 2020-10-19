import axios from '@/axios'
let apis = {
  getAllStationTraffic: '',
  getfilelist: '',//获取上传文件数据列表
}
export const getAllStationTraffic = (params) => {
  return axios.post('/api' + apis.getAllStationTraffic, { data: params })
}
export const getfilelist = (params) => {
  return axios.get('/api' + apis.getfilelist, { data: params })
}