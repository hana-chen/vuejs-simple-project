<template>  
  <b-modal v-model="showModal" title="User Details" @ok="save" @cancel="clear" @hidden="clear">
    <el-form :model="editingUser" ref="editingUser" label-position="left" label-width="120px">
      <el-form-item label="ID" v-if="!addingUser">
        <label class="value">{{editingUser.id}}</label>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="firstName" label="First name" :rules="[{ required: true, message: 'Please input first name', trigger: 'blur'}]">
                <el-input v-model="editingUser.firstName" ref="firstName" @keyup.enter="save"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="lastName" label="Last name" :rules="[{ required: true, message: 'Please input last name', trigger: 'blur'}]">
            <el-input v-model="editingUser.lastName" @keyup.enter="save"></el-input>   
          </el-form-item>
        </el-col>   
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="email" label="Email" :rules="[
              { required: true, message: 'Please input email address', trigger: 'blur' },
              { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
            ]">
              <el-input v-model="editingUser.email" @keyup.enter="save" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Phone number">
            <el-input v-model="editingUser.phoneNumber" @keyup.enter="save"></el-input>
          </el-form-item>
        </el-col>    
      </el-row>  
      <el-form-item label="Address">
        <el-input type="textarea" rows="4" v-model="editingUser.address" @keyup.enter="save"></el-input>
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
  }

  save() {
    this.$refs['editingUser'].validate((valid) => {
      if (valid) {
        if (this.addingUser) {
          this.addUser();
        } else {
          this.updateUser();
        }
      } else {
        console.log('error submit!!');
        return false;
      }
    });    
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
<style lang="scss" scoped>@import url('style.scss');</style>