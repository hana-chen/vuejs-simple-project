import { SET_USERS } from './user-store-types'

export const mutations = {
  [SET_USERS] (state, users) {
    state.users = users
  }
}