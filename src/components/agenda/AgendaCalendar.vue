<template>
  <div class="container">    
    <button @click="refreshEvents">Refresh</button>
    <button @click="removeEvent">Remove</button>
    <pre></pre>
    <div ref="calendar" id="calendar"></div>
    <!-- <full-calendar ref="calendar" @event-selected="eventSelected" :config="config" :events="events"/> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import $ from 'jquery'
import { Component, Prop, Watch } from 'vue-property-decorator'
import elementUI from 'element-ui'
import vuei18n from 'vue-i18n'
import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'
import * as agendaTypes from '../../store/agenda/agenda-store-types'
import { Agenda } from '../agenda/agenda-model'
import { Getter, Mutation, Action } from 'vuex-class'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import fullCalendar from 'fullcalendar'
import { isNull } from 'util';

require('../../../node_modules/fullcalendar/dist/fullcalendar.css')

locale.use(lang)
Vue.use(elementUI)
Vue.use(vuei18n)

@Component({})
export default class AgendaCalendar extends Vue {
  config: {};
  eventItems: any = null;
  selected: {};
  
  @Getter(agendaTypes.GET_AGENDAS) agendas: Agenda[];
  @Action(agendaTypes.FETCH_AGENDAS) 
  storeListOfAgenda: () => Promise<AxiosResponse>;
  
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
      defaultView: 'agendaWeek',
      // events: () => {
      //   return this.eventItems
      // },
      events: (start, end, timezone, callback) => { 
        this.storeListOfAgenda().then((response) =>
          {
            this.eventItems = [];
            this.eventItems.push(...this.agendas)
            callback(this.eventItems);
          }
        );      
      },
      customButtons: {
        addEventButton: {
          text: 'Add event',
          click: () => {            
            //$('#calendar').fullCalendar('renderEvents', this.eventItems)
          }
        }
      },
      eventRender: (event, element) => {
        // element.qtip({
        //   content: event.description
        // })
      },
      eventSelected: (event) => {
        this.selected = event;
      },
      refreshEvents: (event) => {
        this.getListOfAgendas();
        this.$refs.calendar.$emit('refetch-events');
      },
      removeEvent: () => {
        this.$refs.calendar.$emit('remove-event', this.selected);
      }
    })   
  }
  created(){
    this.eventItems = [];
  }

  getListOfAgendas(){    
    return this.agendas;
  }

  refreshEvents() {
    this.getListOfAgendas();
    this.$refs.calendar.$emit('refetch-events');
  };
  removeEvent() {
    this.$refs.calendar.$emit('remove-event', this.selected);
    this.selected = {};
  };

  eventSelected(event) {
    console.log(event);
    this.selected = event;
  };
  // eventCreated(...test) {
  //   console.log(test);
  // };
  
  // eventSources() {
  //     const self = this;
  //     return [
  //       {
  //         events(start, end, timezone, callback) {
  //           setTimeout(() => {
  //             callback(self.events.filter(() => Math.random() > 0.5));
  //           }, 1000);
  //         },
  //       },
  //     ];
  //   };
}
</script>

<style lang="scss" scoped>

</style>