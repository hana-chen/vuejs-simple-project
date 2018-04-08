import axios from 'axios'
import { User } from './user-model'

const api = 'api'

export default class UserService {
    deleteUser(user: User) {
        return axios.delete('api/user/${user.id}');
    }
    getUsers(){
        return axios.get<User[]>('api/users');
    }
    getUser(){
        return axios.get<User>('api/user/${user.id}');
    }
    addUser(user: User){
        return axios.post('api/user', { user });
    }
    updateUser(user: User){
        return axios.put('api/user/${user.id}', {user});
    }
}

//export a singleton instance in the global namespace
//export const userService = new UserService();