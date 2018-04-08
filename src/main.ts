import Vue from 'vue'
import Component from 'vue-class-component'
import elementUI from 'element-ui'
import Router from './router'
import store from './store'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import FullCalendar from 'vue-full-calendar'
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "fullcalendar/dist/fullcalendar.min.css";
import vuei18n from 'vue-i18n'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import moment from 'moment'
import * as VueGoogleMaps from 'vue2-google-maps'

locale.use(lang)
Vue.use(elementUI)
Vue.use(vuei18n)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAQmF6hI1k-CSiEV8JV2iwwyRarhW8mThU",
    libraries: "places"
  }
})

Vue.use(BootstrapVue)
Vue.use(FullCalendar)

Vue.use
new Vue({
  el: '#app',
  template: '<App/>',    
  router: Router,
  store,
  components: {
    App
  }
});