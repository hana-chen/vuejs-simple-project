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
body,
input[text],
button {
  color: #888;
  font-family: Arial;
}
button {
  color: #888;
  font-family: Arial;
  font-size: 14px;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #cfd8dc;
  }
}
body {
  margin: 0;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif
}
.header {
  color: #fff;
  background-color: #00d1b2;
  background-image: -webkit-linear-gradient(309deg,#009e6c 0,#00d1b2 71%,#00e7eb 100%);
  background-image: linear-gradient(141deg,#009e6c 0,#00d1b2 71%,#00e7eb 100%);
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
@media screen and (min-width: 769px)
{
  .header .header-body {
      padding-top: 9rem;
  }
}
.header-body {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 3rem 1.5rem;
}
.title {
  font-weight: 300;
  line-height: 1.125;
}
.header-bar {
  background-color: rgb(0, 120, 215);
  height: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
}
label {
  display: inline-block;
  width: 4em;
  margin: 0.5em 0;
  color: #888;
  &.value {
    margin-left: 10px;
    font-size: 14px;
  }
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: 0.4em;
  &::placeholder {
    color: lightgray;
    font-weight: normal;
    font-size: 12px;
    letter-spacing: 3px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.modal-dialog {
  max-width: 800px;
}

.pac-container{
  z-index: 9000;
}

.navbar {
  background-color: #00eb9d;
  color: #fff;
  padding: 0;
  margin-bottom: 20px;
}
nav li:hover,
nav li.active {
   background-color: #009e61;
   cursor: pointer;
 }
 .col {
   list-style-type: none;
   padding-left: 30px;
 }

 .fc-event-container {
  padding: 2px !important;
}

.fc-event {
  padding: 5px 8px;
  border-color: #ddd;
  background: #DAF8FB !important;

  .fc-content {
    color: #444;
  }

  h4,
  h5 {
    margin: 0;
    font-weight: normal;
  }

  h4 {
    color: #666;
    font-size: 13px;
    line-height: 18px;
    white-space: normal;
  }

  h5 {
    color: #888;
    font-size: 12px;
    margin-top: 5px;
  }

  .guest-count {
    margin: 5px 0;
  }

  p[class^="type-"] {
    margin: 0;
  }

  p[class="type-Corporate"] {
    color: red;
  }

  p[class="type-Wedding"] {
    color: green;
  }

  p[class="type-Birthday"] {
    color: blue;
  }
}
</style>