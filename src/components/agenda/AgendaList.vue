<template>
  <transition name="fade">
    <div>      
      <div class="button-group text-right">
        <button @click="getListOfAgendas">Refresh</button>
        <button @click="enableAddMode" v-if="!addingAgenda && !selectedAgenda">Add new event</button>
      </div>          
      <el-table :data="agendas" stripe>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="description" label="Description"></el-table-column>
        <el-table-column prop="start" label="Start time">
          <template slot-scope="scope">
            {{ scope.row.start | formatDate }}
          </template>
        </el-table-column>        
        <el-table-column prop="end" label="End time">
          <template slot-scope="scope">
            {{ scope.row.end | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="appointmentPlace" label="Appointment place"></el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteAgenda(scope.row)">Delete</el-button>
            <el-button type="text" size="small" @click="onSelect(scope.$index, scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AgendaDetail
          v-if="selectedAgenda || addingAgenda"
          :agenda-model="selectedAgenda" :show-modal="showModal"
          @unselect="unselect"
          @agendaChanged="agendaChanged"></AgendaDetail>
    </div>
  </transition>    
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AgendaDetail from './AgendaDetail.vue';
import * as agendaTypes from '../../store/agenda/agenda-store-types'
import { Agenda } from '../agenda/agenda-model'
import { Getter, Mutation, Action } from 'vuex-class'
import { AxiosResponse } from 'axios';
import moment from 'moment'


Vue.filter('formatDate', function(value){
  if(value){
    return moment(String(value)).format('MM/DD/YYYY hh:mm');
  }
})

@Component({
  components: {
    AgendaDetail
  },
  filters: {
    formatDate: function(value){
      if(value){
        return moment(String(value)).format('MM/DD/YYYY hh:mm');
      }
    }
  }
})
export default class AgendaList extends Vue {
  @Getter(agendaTypes.GET_AGENDAS) agendas: Agenda[];
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

  created(){
    this.storeListOfAgenda();
  }

  getListOfAgendas(){    
    return this.agendas;
  }

  onSelect(index, row: Agenda) {
    this.selectedAgenda = row;
    this.showModal = true;
  }

  deleteAgenda(agenda: Agenda) {    
    this.storeDeleteAgenda(agenda);    
  }
  
  enableAddMode() {
    this.addingAgenda = true;
    this.selectedAgenda = null;
    this.showModal = true;
  }

  agendaChanged(mode: string, agenda: Agenda) {
    if (mode === 'add') {      
      this.storeAddAgenda(agenda);
    } else {
      this.storeUpdateAgenda(agenda);
    }
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