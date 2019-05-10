import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
//import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import "./assets/css/element-ui-color.scss"

Vue.config.productionTip = false
Vue.use(ElementUI, { locale });//后期减少数量，menu,button,table,loading
Vue.use(VueAxios, axios);

const root = new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('custom-render-trigger'))
  }
})

document.addEventListener('DOMContentLoaded', function () {
  root.$mount('#app');
})

//修改每个页面的title
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  let subtitle = "";
  switch (to.params.type) {
    case "rs":
      subtitle = "RefSeq Map";
      break;
    case "oh":
      subtitle = "Organelle History";
      break;
    case "sc":
      subtitle = "Scattered Comparison";
      break;
    case "bs-3d":
      subtitle = "Bar Space";
      break;
    case "sl":
      subtitle = "Species List";
      break;
    default:
      break;
  }
  if (to.meta.title) {
    document.title = to.meta.title + subtitle;
  }
  next();
})
