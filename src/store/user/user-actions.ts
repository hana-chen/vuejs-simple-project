import axios from 'axios'
import { FETCH_USERS, SET_USERS, ADD_USER, DELETE_USER, UPDATE_USER } from './user-store-types'
import { User } from '../../components/user/user-model';
import UserService from '../../components/user/user.service'

export const actions = {
  [FETCH_USERS] ({ commit }) {    
    return axios.get('api/users/')
      .then((response) =>
        commit(SET_USERS, response.data))
  },
  [ADD_USER] ({commit}, user: User){      
      return axios.post('api/user/', {user})
        .then((response) =>
            commit(SET_USERS, response.data)
        )
  },
  [UPDATE_USER] ({commit}, user: User){      
    return axios.put('api/user/${user.id}', { user })
      .then((response) =>
          commit(SET_USERS, response.data))
  },
  [DELETE_USER] ({commit}, user: User){      
    return axios.delete('api/user/${user.id}', { data: {id: user.id}})
        .then((response) =>
            commit(SET_USERS, response.data))
  }  
}