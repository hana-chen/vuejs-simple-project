<template>
  <div id="app">
    <div class="header">
      <div class="header-body">
        <div class="container">
          <h1 class="title">{{ title }}</h1>
        </div>
      </div>
    </div>  
    <nav class="navbar navbar-expand-lg row">
      <router-link tag="li" class="col" active-class="active" to="/" exact>Home</router-link>
      <router-link tag="li" class="col" active-class="active" to="users" exact>User</router-link>
      <router-link tag="li" class="col" active-class="active" to="agendas" exact>Agenda</router-link>
    </nav>
    
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import elementUI from 'element-ui'

Vue.use(elementUI)

@Component({})
export default class App extends Vue {
  title: string;
  constructor() {
    super();
    this.title = 'My Simple Vue App';
  }
}
</script>

<style lang="scss">
  @import 'style.scss'
</style>