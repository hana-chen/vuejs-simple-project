<template>  
  <b-modal v-model="showModal" title="User Details" @ok="save" @cancel="clear" @hidden="clear">
    <el-form label-position="left" label-width="150px">
      <el-form-item label="ID" v-if="!addingUser">
        <label class="value">{{editingUser.id}}</label>
      </el-form-item>
      <el-form-item label="First name">
        <el-input v-model="editingUser.firstName" ref="firstName" @keyup.enter="save"></el-input>
      </el-form-item>
      <el-form-item label="Last name">
        <el-input v-model="editingUser.lastName" @keyup.enter="save"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="editingUser.email" @keyup.enter="save"></el-input>
      </el-form-item>
      <el-form-item label="Phone number">
        <el-input v-model="editingUser.phoneNumber" @keyup.enter="save"></el-input>
      </el-form-item>
      <el-form-item label="Address">
        <el-input v-model="editingUser.address" @keyup.enter="save"></el-input>
      </el-form-item>      
    </el-form>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { User } from '../user/user-model';
import { Getter, Action } from 'vuex-class'
import * as userTypes from '../../store/user/user-store-types'
import { AxiosResponse } from 'axios';

@Component({})
export default class UserDetail extends Vue {  
  @Prop({default: null}) userModel: User | null;
  
  showModal: boolean;
  addingUser = !this.userModel;
  editingUser: User | null = null;   

  @Watch('userModel') 
  onUserChanged(value: string, oldValue: string) {
    this.editingUser = this.cloneIt();
    this.setFocus();
    this.showModal = true;
  }

  $refs: {
    id: HTMLElement;
    firstName: HTMLElement;
    lastName: HTMLElement;
  };


  @Emit('unselect') 
  clear() {
    this.editingUser = null;
    this.showModal = false;
  }

  cloneIt() {
    return (<any>Object).assign({}, this.userModel);
  }

  created() {
    this.editingUser = this.cloneIt();
    this.showModal = true;
  }
  
  @Emit('userChanged') 
  emitRefresh(mode: string, user: User) {
    this.clear();
  }
  
  mounted() {
    this.setFocus();
  }

  setFocus() {
    this.$refs.firstName.focus();
    // if (this.addingUser && this.editingUser) {
    //   this.$refs.id.focus();
    // } else {
    //   this.$refs.firstName.focus();
    // }
  }

  save() {
    if (this.addingUser) {
      this.addUser();
    } else {
      this.updateUser();
    }
  }
  
  addUser() {
    const currentUser = <User>this.editingUser;
    this.emitRefresh('add', currentUser);
  }

  updateUser() {
    const currentUser = <User>this.editingUser;
    this.emitRefresh('update', currentUser);
  }
}
</script>

<style lang="scss" scoped>
.editarea {
  float: left;
  input {
    margin: 4px;
    height: 20px;
    color: rgb(0, 120, 215);
  }
  button {
    margin: 8px;
  }
  .editfields {
    margin-left: 12px;
  }
}
</style>