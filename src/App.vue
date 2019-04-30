<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view
        v-loading.fullscreen.lock="loading"
        element-loading-background="rgba(23, 24, 32, 0.8)"
      />
    </transition>
    <Header/>
    <Footer/>
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "index",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    openLoading() {
      this.loading = true;
    },
    cancelLoading() {
      this.loading = false;
    },
    popNotification(content) {
      this.$notify.info({
        title: "notification",
        message: content
      });
    }
  }
};
</script>

<style lang="scss">
@import "./assets/css/reset.scss"; /*引入公共样式*/
@import url("./assets/css/font-awesome.min.css");
body {
  background: rgba(23, 24, 32, 0.95);
  font-family: "Roboto", "Helvetica", Verdana, Sans-serif;
  color: rgba(255, 255, 255, 0.75);
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
img{
  object-fit: cover;
  
}
</style>
