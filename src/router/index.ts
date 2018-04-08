import Vue from 'vue'
import Router from 'vue-router'
import UserList from '../components/user/UserList.vue'
import AgendaList from '../components/agenda/AgendaList.vue'
import AgendaCalendar from '../components/agenda/AgendaCalendar.vue'

Vue.use(Router)

export default new Router ({
    mode: "history",
    linkActiveClass: "active",
    linkExactActiveClass: "active",
    routes: [
        {
            path: '/',
            name: 'Events',            
            component: AgendaCalendar
        },
        {
            path: '/users',
            name: 'User',            
            component: UserList
        },
        {
            path: '/agendas',
            name: 'Agenda',            
            component: AgendaList
        }
    ]
})