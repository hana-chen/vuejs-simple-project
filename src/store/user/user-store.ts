import { getters } from './user-getters'
import { mutations } from './user-mutations'
import { actions } from './user-actions'
import { User } from '../../components/user/user-model'

const initialState = {
  users: []
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}