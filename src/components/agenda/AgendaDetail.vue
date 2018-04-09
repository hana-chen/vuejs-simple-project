<template>
    <b-modal v-model="showModal" title="Event Details" @ok="save" @cancel="clear" @hidden="clear">
        <el-form label-position="left" label-width="150px">
        <el-form-item label="ID" v-if="!addingAgenda">
            <label class="value">{{editingAgenda.id}}</label>
        </el-form-item>
        <el-form-item label="Title">
            <el-input v-model="editingAgenda.title" ref="title" @keyup.enter="save"></el-input>
        </el-form-item>
        <el-form-item label="Description">
            <el-input type="textarea" v-model="editingAgenda.description" @keyup.enter="save"></el-input>
        </el-form-item>
        <el-form-item label="Start time">
            <el-date-picker type="datetime" placeholder="Pick a date" v-model="editingAgenda.start" style="width: 100%;" @keyup.enter="save"></el-date-picker>
        </el-form-item>
        <el-form-item label="End time">
            <el-date-picker type="datetime" placeholder="Pick a date" v-model="editingAgenda.end" style="width: 100%;" @keyup.enter="save"></el-date-picker>
        </el-form-item>
        <el-form-item label="Appointment place">            
            <gmap-autocomplete class="el-input__inner" @place_changed="setPlace" v-model="editingAgenda.appointmentPlace"></gmap-autocomplete>         
            <input hidden v-model="editingAgenda.appointmentPlaceX"/>
            <input hidden v-model="editingAgenda.appointmentPlaceY"/>
            <gmap-map
            :center="center"
            :zoom="12"
            style="width:100%;  height: 400px;">
            <gmap-marker label="★"
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                @click="center=m.position"></gmap-marker>
            </gmap-map>
        </el-form-item>         
        
        </el-form>
    </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { Agenda } from './agenda-model';
import elementUI from 'element-ui'
import { Getter, Mutation, Action } from 'vuex-class'
import { AxiosResponse } from 'axios';

Vue.use(elementUI)

@Component({})
export default class AgendaDetail extends Vue {
    @Prop({default: null}) agendaModel: Agenda | null;

    showModal: boolean;
    addingAgenda = !this.agendaModel;
    editingAgenda: Agenda | null = null;

    //google map
    center: {};
    markers: any [];
    places: any [];
    currentPlace: any;

    created() {
        this.editingAgenda = this.cloneIt();
        this.showModal = true;
        this.markers = [];
        this.places = [];
        this.currentPlace = null;
        if(this.editingAgenda){
            this.center = {
                lat: this.editingAgenda.appointmentPlaceX,
                lng: this.editingAgenda.appointmentPlaceY
            }
            const marker = {
                lat: this.editingAgenda.appointmentPlaceX,
                lng: this.editingAgenda.appointmentPlaceY
            }
            this.markers.push({ position: marker });
        }else{
            this.center = {
                lat: 45.508,
                lng: -73.587
            }
        }
    }
    mouted(){
        this.geolocate();
    }
    cloneIt() {
        return (<any>Object).assign({}, this.agendaModel);
    }

    save() {
        if (this.addingAgenda) {
        this.addAgenda();
        } else {
        this.updateAgenda();
        }
    }
    
    addAgenda() {
        const currentAgenda = <Agenda>this.editingAgenda;
        this.emitRefresh('add', currentAgenda);
    }

    updateAgenda() {
        const currentAgenda = <Agenda>this.editingAgenda;
        this.emitRefresh('update', currentAgenda);
    }

    @Emit('agendaChanged') 
    emitRefresh(mode: string, agenda: Agenda) {
        this.clear();
    }

    @Emit('unselect') 
    clear() {
        this.editingAgenda = null;
        this.showModal = false;
    }

    setPlace(place) {    
      this.currentPlace = place;
      if(this.editingAgenda){
        this.editingAgenda.appointmentPlace = place.formatted_address;
        this.editingAgenda.appointmentPlaceX = place.geometry.location.lat();
        this.editingAgenda.appointmentPlaceY = place.geometry.location.lng();
      }
      this.markers = [];
      this.addMarker();
    }

    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };        
        this.markers.push({ position: marker });        
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    }

    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
}
</script>
