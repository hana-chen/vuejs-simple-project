import Vue from 'vue'
import Vuex from 'vuex'
import users from './user/user-store'
import agendas from './agenda/agenda-store'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        users,
        agendas
    }
})