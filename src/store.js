import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

async function getData() {
  let NCBIData = null;
  await Vue.axios.get("/api/gene").then((res) => {
    NCBIData = res.data;
  });
  return NCBIData;
}

export default new Vuex.Store({
  state: {
    NCBIData: null
  },
  mutations: {
    setNCBIData(state, data) {
      state.NCBIData = data;
    }
  },
  actions: {
    async setNCBIData(context, data) {
      context.commit('setNCBIData', data ? data : await getData());
    }
  }
})
