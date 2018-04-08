import axios from 'axios'
import { FETCH_AGENDAS, SET_AGENDAS, ADD_AGENDA, DELETE_AGENDA, UPDATE_AGENDA, GET_AGENDAS } from './agenda-store-types'
import { Agenda } from '../../components/agenda/agenda-model'

export const actions = {
  [FETCH_AGENDAS] ({ commit }) {    
    return axios.get('api/agendas/')
      .then((response) => 
          commit(SET_AGENDAS, response.data)
      )
  },
  [ADD_AGENDA] ({commit}, agenda: Agenda){      
      return axios.post('api/agenda/', {agenda})
        .then((response) =>
            commit(SET_AGENDAS, response.data))
  },
  [UPDATE_AGENDA] ({commit}, agenda: Agenda){      
    return axios.put('api/agenda/${agenda.id}', { agenda })
      .then((response) =>
          commit(SET_AGENDAS, response.data))
  },
  [DELETE_AGENDA] ({commit}, agenda: Agenda){      
    return axios.delete('api/agenda/${agenda.id}', { data: {id: agenda.id}})
        .then((response) =>
            commit(SET_AGENDAS, response.data))
  }  
}