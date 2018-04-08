import { GET_USERS } from './user-store-types'

export const getters = {
  [GET_USERS] (state) {
    return state.users
  }
}