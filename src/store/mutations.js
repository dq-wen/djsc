import * as types from './mutation-types'

export default {
  [types.USER_INFO](state, payload) {
    state.userInfo = payload
  },
  [types.MENU_INDEX](state, payload) {
    state.menuIndex = payload
  },

  [types.SET_ROUTERID]:(state,routerId)=>{
    state.routerId = routerId
  },

  [types.SET_FIRSTOPTION]:(state,firstOption)=>{
    state.firstOption = firstOption
  },

  [types.SET_TITLENAME]:(state,titleName)=>{
    state.titleName = titleName
  },
}
