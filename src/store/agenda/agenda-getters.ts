import { GET_AGENDAS } from './agenda-store-types'

export const getters = {
  [GET_AGENDAS] (state) {
    return state.agendas
  }
}