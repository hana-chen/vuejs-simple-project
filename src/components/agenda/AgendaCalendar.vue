<template>
  <div class="container">    
    <button @click="refreshEvents">Refresh</button>
    <button @click="removeEvent">Remove</button>
    <pre></pre>
    <div ref="calendar" id="calendar"></div>
    <!-- <full-calendar ref="calendar" @event-selected="eventSelected" :config="config" :events="events"/> -->
    <agenda-detail
          v-if="selectedAgenda || addingAgenda" :adding-agenda="addingAgenda"
          :agenda-model="selectedAgenda" :show-modal="showModal"
          @unselect="unselect"
          @agendaChanged="agendaChanged"></agenda-detail>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import $ from 'jquery'
import { Component, Prop, Watch } from 'vue-property-decorator'
import elementUI from 'element-ui'
import vuei18n from 'vue-i18n'
import * as agendaTypes from '../../store/agenda/agenda-store-types'
import * as userTypes from '../../store/user/user-store-types'
import { Agenda } from '../agenda/agenda-model'
import { User } from '../user/user-model'
import { Getter, Mutation, Action } from 'vuex-class'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import fullCalendar from 'fullcalendar'
import { isNull } from 'util';
import AgendaDetail from './AgendaDetail.vue';

require('../../../node_modules/fullcalendar/dist/fullcalendar.css')

Vue.use(elementUI)

@Component({
  components: {
    'agenda-detail': AgendaDetail
  }
})
export default class AgendaCalendar extends Vue {
  eventItems: any = null;
  
  @Getter(userTypes.GET_USERS) users: User[];
  
  @Getter(agendaTypes.GET_AGENDAS) agendas: Agenda[];
  
  @Action(userTypes.FETCH_USERS)
  storeListOfUser: () => Promise<AxiosResponse>;
  
  @Action(agendaTypes.FETCH_AGENDAS) 
  storeListOfAgenda: () => Promise<AxiosResponse>;
  
  @Action(agendaTypes.DELETE_AGENDA)
  storeDeleteAgenda: (param) => Promise<AxiosResponse>;
  
  @Action(agendaTypes.UPDATE_AGENDA)
  storeUpdateAgenda: (param) => Promise<AxiosResponse>;

  @Action(agendaTypes.ADD_AGENDA)
  storeAddAgenda: (param) => Promise<AxiosResponse>;

  addingAgenda = false;
  selectedAgenda: Agenda | null = null;
  showModal: boolean;

  $refs: {
    calendar
  }

  isPast(date){
    let today = moment().format();
    return moment(today).isAfter(date);
  }
  mounted(){
    $('#calendar').fullCalendar({
      header: {left: 'addEventButton', center: 'agendaDay,agendaWeek,month,list'},
      defaultView: 'month',
      editable: true,
      eventLimit: true,
      views: {
        month: {
          eventLimit: 3
        }
      },
      events: (start, end, timezone, callback) => { 
        this.storeListOfAgenda().then((response) =>
          {
            this.eventItems = [];
            this.eventItems.push(...this.agendas)
            callback(this.eventItems);
          }
        );      
      },
      dayClick: (date, jsEvent, view) => {
        var newEvent = {      
          id: null,    
          start: moment(date).format('YYYY-MM-DD hh:mm a'),
          end: moment(date).format('YYYY-MM-DD hh:mm a')
        }
        this.selectedAgenda = new Agenda(newEvent);                    
        this.addingAgenda = true;
        this.showModal = true;
      },
      customButtons: {
        addEventButton: {
          text: 'Add event',
          click: () => {
            this.addingAgenda = true;
            this.selectedAgenda = null;
            this.showModal = true;
          }
        }
      },
      eventRender: (event, element) => {        
        // element.qtip({
        //   content: event.description
        // })
        //console.log(event);
        //<p class="type-${ event.userId }">#${ event.userFullName }</p>
        var startD = moment(event.start).format('hh:mm A');
        var endD = moment(event.start).format('hh:mm A');
        element.find( '.fc-content' ).html(
        `<h4>${startD} - ${ event.title }</h4>
         <p class="guest-count">${ event.appointmentPlace } Guests</p>   
         
        `
        );
      },
      eventClick: (event, jsEvent, view) => {
        event.source = null;
        event.start = moment(event.start).format('YYYY-MM-DD hh:mm a');
        event.end = moment(event.end).format('YYYY-MM-DD hh:mm a');
        this.selectedAgenda = event;
        this.showModal = true;
      }
    })   
  }
  created(){
    this.eventItems = [];
    this.storeListOfUser();
  }

  getListOfAgendas(){    
    return this.agendas;
  }

  refreshEvents() {
    $('#calendar').fullCalendar('refetchEvents');
  };

  removeEvent() {
    this.$refs.calendar.$emit('remove-event', this.selectedAgenda);
    this.selectedAgenda = null;
  };

  agendaChanged(mode: string, agenda: Agenda) {
    if (mode === 'add') {      
      this.storeAddAgenda(agenda);
    } else {
      this.storeUpdateAgenda(agenda);
    }
    $('#calendar').fullCalendar('refetchEvents');
  }

  unselect() {
    this.addingAgenda = false;
    this.selectedAgenda = null;
    this.showModal = false;
  }
}
</script>

<style lang="scss" scoped>

</style>