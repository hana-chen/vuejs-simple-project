<template>
    <div>
        <div>{{ editingAgenda.title }}</div>
        <div>{{ editingAgenda.description }}</div>
        <div>{{ editingAgenda.appointmentPlace }}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { Agenda } from './agenda-model';
import { Getter, Mutation, Action } from 'vuex-class'
import { AxiosResponse } from 'axios';


@Component({})
export default class AgendadlflkDetail extends Vue {
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
