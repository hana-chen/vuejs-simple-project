import { getters } from './agenda-getters'
import { mutations } from './agenda-mutations'
import { actions } from './agenda-actions'
import { Agenda } from '../../components/agenda/agenda-model'

const initialState = {
  agendas: []
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}