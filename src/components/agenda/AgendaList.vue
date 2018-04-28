<template>
  <transition name="fade">
    <div class="container">      
      <div class="button-group text-right">
        <button @click="getListOfAgendas">Refresh</button>
        <button @click="enableAddMode" v-if="!addingAgenda && !selectedAgenda">Add new event</button>
      </div>          
      <el-table :data="agendas" stripe :default-sort = "{prop: 'start', order: 'ascending'}">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="userId" label="Owner" :filters="getListOfOwners"
      :filter-method="filterOwner"
      filter-placement="bottom-end">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="description" label="Description"></el-table-column>
        <el-table-column prop="start" sortable label="Start time">
          <template slot-scope="scope">
            {{ scope.row.start | formatDate }}
          </template>
        </el-table-column>        
        <el-table-column prop="end" label="End time">
          <template slot-scope="scope">
            {{ scope.row.end | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="appointmentPlace" label="Location"></el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteAgenda(scope.row)">Delete</el-button>
            <el-button type="text" size="small" @click="onSelect(scope.$index, scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <agenda-detail
          v-if="selectedAgenda || addingAgenda" :adding-agenda="addingAgenda"
          :agenda-model="selectedAgenda" :show-modal="showModal"
          @unselect="unselect"
          @agendaChanged="agendaChanged"></agenda-detail>
    </div>
  </transition>    
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import AgendaDetail from './AgendaDetail.vue';
import * as agendaTypes from '../../store/agenda/agenda-store-types'
import * as userTypes from '../../store/user/user-store-types'
import { Agenda } from '../agenda/agenda-model'
import { User } from '../user/user-model'
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
  
  @Getter(userTypes.GET_USERS) users: User[];
  
  @Action(userTypes.FETCH_USERS)
  storeListOfUser: () => Promise<AxiosResponse>;
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

  get getListOfOwners(): number[]{
    return this.agendas.filter(a => a.id).map(a => a.userId);
  }
  filterOwner(value, row){
    return row.userId == value;
  }
  created(){          
    this.storeListOfAgenda().then(() => {
      this.storeListOfUser().then(() => {
        this.agendas.forEach(item => {
          item.user = this.users.filter(usr => usr.id == item.userId)[0];
        })
        console.log(this.agendas);
      });
      
    }); 
  }

  getListOfAgendas(){    
    return this.agendas;
  }

  onSelect(index, row: Agenda) 
  {
    this.selectedAgenda = row;
    this.showModal = true;
  }

  deleteAgenda(agenda: Agenda) {   
    this.$confirm(`Are you sure you want to delete event ${agenda.title}?`, 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {                    
          this.storeDeleteAgenda(agenda).then(() => 
            this.$message({
              type: 'success',
              message: 'Delete event completed'
            })
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete event canceled'
          });          
        });    
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
  @import 'style.scss'
</style>