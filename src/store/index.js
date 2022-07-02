import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  // 指定的是本地存储
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHisstoryList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    searchHisstoryList (state, payload) {
      let arr = state.searchHisstoryList
      arr.unshift(payload)
      arr = [...new Set(arr)]// 去重
      state.searchHisstoryList = arr
    },
    // 根据索引删除一个
    delHistory (state, index) {
      state.searchHisstoryList.splice(index, 1)
    },
    // 删除所有
    delAllHistory (state) {
      state.searchHisstoryList = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
