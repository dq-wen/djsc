import * as types from './mutation-types'

export default {
  refreshUser: ({
    commit
  }, payload) => {
    // 触发commit，记录更改
    commit(types.USER_INFO, payload)
  }
}
