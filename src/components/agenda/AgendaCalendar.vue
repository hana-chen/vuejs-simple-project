<template>
  <div>    
    <button @click="refreshEvents">Refresh</button>
    <button @click="removeEvent">Remove</button>
    <pre></pre>
    <full-calendar ref="calendar" @event-selected="eventSelected" :config="config" :events="events"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import elementUI from 'element-ui'
import vuei18n from 'vue-i18n'
import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'
import * as agendaTypes from '../../store/agenda/agenda-store-types'
import { Agenda } from '../agenda/agenda-model'
import { Getter, Mutation, Action } from 'vuex-class'
import { AxiosResponse } from 'axios';
import moment from 'moment'

locale.use(lang)
Vue.use(elementUI)
Vue.use(vuei18n)

@Component({})
export default class AgendaCalendar extends Vue {
  config: {};
  events: {};
  selected: {};
  
  @Getter(agendaTypes.GET_AGENDAS) agendas: Agenda[];
  @Action(agendaTypes.FETCH_AGENDAS) 
  storeListOfAgenda: () => Promise<AxiosResponse>;
  
  $refs: {
    calendar
  }

  created(){
    this.storeListOfAgenda();
        
    this.config = {
        eventClick: (event) => {
          //this.selected = event;
        },
      };
    this.events = {
      data: () => {
        return this.agendas;
      }
    };

    //console.log(this.getListOfAgendas());
    console.log(this.agendas);
    //console.log(this.events);
    this.events = [
        {
          id: 1,
          title: 'event1',
          start: moment().hours(12).minutes(0),          
        },
        {
          id: 2,
          title: 'event2',
          start: moment().add(-1, 'days'),
          end: moment().add(1, 'days'),
          allDay: true,
        },
        {
          id: 3,
          title: 'event3',
          start: moment().add(2, 'days'),
          end: moment().add(2, 'days').add(6, 'hours'),
          allDay: false,
        }
    ]
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
    //this.selected = {};
  };

  eventSelected(event) {
    console.log(event);
    //this.selected = event;
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