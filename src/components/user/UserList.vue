<template>
  <div class="container">    
    <div class="button-group text-right">
      <button @click="getListOfUsers">Refresh</button>
      <button @click="enableAddMode" v-if="!addingUser && !selectedUser">Add user</button>
    </div>
    <transition name="fade">
      <div>
        <el-table :data="users" stripe>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="firstName" label="First name"></el-table-column>
          <el-table-column prop="lastName" label="Last name"></el-table-column>
          <el-table-column prop="email" label="Email"></el-table-column>        
          <el-table-column prop="phoneNumber" label="Phone number"></el-table-column>
          <el-table-column prop="address" label="Address"></el-table-column>
          <el-table-column label="Actions">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteUser(scope.row)">Delete</el-button>
              <el-button type="text" size="small" @click="onSelect(scope.$index, scope.row)">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </transition>    
     <UserDetail
        v-if="selectedUser || addingUser"
        :user-model="selectedUser" :show-modal="showModal"
        @unselect="unselect"
        @userChanged="userChanged"></UserDetail>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import UserDetail from './UserDetail.vue';
import UserService from './user.service';
import { User } from './user-model';
import * as userTypes from '../../store/user/user-store-types'
import { Getter, Mutation, Action } from 'vuex-class'
import { AxiosResponse } from 'axios';

@Component({
  components: { UserDetail }
})
export default class UserList extends Vue {
  addingUser = false;
  selectedUser: User | null = null;
  userService: UserService;
  showModal = false;

  @Getter(userTypes.GET_USERS) users: User[];
  
  @Action(userTypes.FETCH_USERS)
  storeListOfUser: () => Promise<AxiosResponse>;
  
  @Action(userTypes.DELETE_USER)
  storeDeleteUser: (param) => Promise<AxiosResponse>;
  
  @Action(userTypes.UPDATE_USER)
  storeUpdateUser: (param) => Promise<AxiosResponse>;

  @Action(userTypes.ADD_USER)
  storeAddUser: (param) => Promise<AxiosResponse>;

  created() {
    this.userService = new UserService();        
    this.selectedUser = null;
    this.storeListOfUser();
  }

  getListOfUsers(){    
    return this.users;
  }

  deleteUser(user: User) {
    this.$confirm(`Are you sure you want to delete user ${user.firstName + ' ' + user.lastName}?`, 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {          
          this.storeDeleteUser(user).then(() => 
            this.$message({
              type: 'success',
              message: 'Delete user completed'
            })
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete user canceled'
          });          
        });
  }
  
  enableAddMode() {
    this.addingUser = true;
    this.selectedUser = null;
    this.showModal = true;
  }

  userChanged(mode: string, user: User) {
    if (mode === 'add') {      
      this.storeAddUser(user);
    } else {
      this.storeUpdateUser(user);
    }
  }
  
  onSelect(index, row: User) {
    this.selectedUser = row;
    this.showModal = true;
  }
  
  unselect() {
    this.addingUser = false;
    this.selectedUser = null;
    this.showModal = false;
  }
}
</script>

<style lang="scss" scoped>
  @import url('style.scss')
</style>