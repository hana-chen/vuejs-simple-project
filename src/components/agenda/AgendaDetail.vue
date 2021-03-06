<template>
    <el-dialog width="70%" :visible.sync="showModal" title="Event Details" @close="clear">
        <el-form label-position="left" label-width="100px">        
        <el-row :gutter="20">
            <el-col :span="16">                
                <el-form-item label="Title">
                    <el-input v-model="editingAgenda.title" ref="title" @keyup.enter="save"></el-input>
                </el-form-item>     
            </el-col>
            <el-col :span="8">
                <el-form-item label="ID" v-if="!addingAgenda">
                    <label class="value">{{editingAgenda.id}}</label>
                </el-form-item>
            </el-col>
        </el-row>        
        <el-row :gutter="20">
            <el-col :span="16">
                <el-form-item label="Description">
                    <el-input type="textarea" v-model="editingAgenda.description" @keyup.enter="save"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="Owners">
                    <el-select v-model="editingAgenda.userId" >
                        <el-option v-for="item in users" :key="item.id" :value="item.id" :label="item.firstName"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row> 
        <el-row>
            <el-form-item label="All day event">
                <el-switch :value="!editingAgenda.end" disabled></el-switch>
            </el-form-item>
        </el-row>       
        <el-row>
            <el-form-item label="Event time">            
                <el-col :span="11">
                    <el-date-picker type="datetime" format="yyyy/MM/dd hh:mm A" value-format="yyyy-MM-dd hh:mm A" default-time="12:00:00" placeholder="Pick a date" v-model="editingAgenda.start" style="width: 100%;"></el-date-picker>        
                </el-col>
                <el-col class="text-center" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker type="datetime" format="yyyy/MM/dd hh:mm A" value-format="yyyy-MM-dd hh:mm A" default-time="12:00:00" placeholder="Pick a date" v-model="editingAgenda.end" style="width: 100%;"></el-date-picker>        
                </el-col>
            </el-form-item>
        </el-row>
                                         
        <el-form-item label="Location">            
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
        <template slot="footer">
            <el-button @click="clear">Cancel</el-button>
            <el-button type="primary" @click="save">Save</el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { Agenda } from './agenda-model';
import * as userTypes from '../../store/user/user-store-types'
import { User } from '../user/user-model'
import { Getter, Mutation, Action } from 'vuex-class'
import { AxiosResponse } from 'axios';
import moment from 'moment'

@Component({})
export default class AgendaDetail extends Vue {
    @Prop({default: null}) agendaModel: Agenda | null;
    @Prop({default: false}) addingAgenda;

    @Getter(userTypes.GET_USERS) users: User[];
    showModal: boolean;
    //addingAgenda = !this.agendaModel;
    editingAgenda: Agenda | null = null;

    //google map
    center: {};
    markers: any [];
    places: any [];
    currentPlace: any;
    startDay: any;
    endDay: any;

    created() {
        this.editingAgenda = this.cloneIt();
        this.showModal = true;
        this.markers = [];
        this.places = [];
        this.currentPlace = null;
        if(!this.addingAgenda && this.editingAgenda){ 
            if(this.editingAgenda.appointmentPlaceX)       
            {
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
        }else{
            this.center = {
                lat: 45.508,
                lng: -73.587
            }
        }
        console.log(this.editingAgenda);
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
