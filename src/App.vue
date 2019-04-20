<template>
  <div id="app">
    
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
    <Header/>
    <Footer/>
  </div>
</template>
<script>
//import './assets/js/main.js';
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "index",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
// @import './assets/css/main.css'; /*引入公共样式*/
@import "./assets/css/reset.scss"; /*引入公共样式*/
@import url("./assets/css/font-awesome.min.css");
body {
  background: rgba(23, 24, 32, 0.95);
  font-family: "Roboto", "Helvetica", Verdana,Sans-serif;
  color: rgba(255, 255, 255, 0.75);
}
</style>
