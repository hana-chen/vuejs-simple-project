<template>
  <div>    
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
    this.storeDeleteUser(user);    
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}


// .button-group {
//   margin: 0.5em;
// }
// button.delete-button {
//   background-color: rgb(216, 59, 1);
//   color: white;
//   padding: 4px;
//   position: relative;
//   font-size: 12px;
//   max-width: 50px;
// }
// .selected {
//   background-color: rgb(0, 120, 215) !important;
//   color: white;
// }
// .users {
//   float: left;
//   margin: 0 0 2em 0;
//   list-style-type: none;
//   padding: 0;
//   width: 20em;
//   li {
//     cursor: pointer;
//     position: relative;
//     background-color: #f7f7f7;
//     margin: 0.5em;
//     height: 3.2em;
//     border-radius: 4px;
//     &:hover {
//       color: #607d8b;
//       color: rgb(0, 120, 215);
//       background-color: #ddd;
//       left: 1px;
//     }
//     &.selected:hover {
//       color: white;
//     }
//   }
//   .text {
//     position: relative;
//     top: -3px;
//   }
//   .saying {
//     margin: 5px 2.3px;
//   }
//   .name {
//     font-weight: bold;
//   }
//   .user-container {
//     display: flex;
//     flex-flow: row wrap;
//   }
//   > * {
//     flex: 1 100%;
//   }
//   .user-element {
//     display: flex;
//     flex-flow: row wrap;
//     flex: 18 auto;
//     order: 1;
//     padding: 0;
//     margin: 0;
//   }
//   .delete-button {
//     flex: 1 auto;
//     order: 2;
//     border-radius: 0 4px 4px 0;
//   }
//   .user-text {
//     flex: 1 auto;
//     order: 2;
//     padding: 0.2em 0.5em;
//   }
//   .badge {
//     flex: 1 auto;
//     order: 1;
//     font-size: small;
//     color: #ffffff;
//     padding: 1.2em 1em 0em 1em;
//     background-color: #607d8b;
//     background-color: rgb(0, 120, 215);
//     background-color: rgb(134, 183, 221);
//     margin: 0em 0em 0em 0em;
//     border-radius: 4px 0 0 4px;
//     max-width: 1.5em;
//   }
// }
</style>