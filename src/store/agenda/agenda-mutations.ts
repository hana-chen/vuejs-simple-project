import { SET_AGENDAS } from './agenda-store-types'

export const mutations = {
  [SET_AGENDAS] (state, agendas) {
    state.agendas = agendas
  }
}