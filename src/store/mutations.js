import * as types from './mutation-types'

export default {
  [types.USER_INFO](state, payload) {
    state.userInfo = payload
  },
  [types.MENU_INDEX](state, payload) {
    state.menuIndex = payload
  }
}
