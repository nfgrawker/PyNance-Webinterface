import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    endpoint: "http://127.0.0.1:5000",
    darkmode: true,
    chatterer: "",
    online: false,
    take_profit: 0,
    symbols: [],
    symbols_sets: [],
    cur1: "",
    cur2: "",
    drawer: true,
    panik: false,
    version: "",
    maintainer: "",
    github: "",
    twitter: "",
    profit: "",
  },
  getters: {
    endpoint: state => { return state.endpoint; },
    darkmode: state => { return state.darkmode; },
    chatterer: state => { return state.chatterer; },
    online: state => { return state.online; },
    take_profit: state => { return state.take_profit; },
    symbols: state => { return state.symbols; },
    symbols_sets: state => { return state.symbols_sets; },
    cur1: state => { return state.cur1; },
    cur2: state => { return state.cur2; },
    drawer: state => { return state.drawer; },
    panik: state => { return state.panik; },
    version: state => { return state.version; },
    maintainer: state => { return state.maintainer; },
    github: state => { return state.github; },
    twitter: state => { return state.twitter; },
    profit: state => { return state.profit; },
  },
  mutations: {
    SET_DARKMODE(state, value) { state.darkmode = value; },
    SET_CHATTERER(state, value) { state.chatterer = value; },
    SET_ONLINE(state, value) { state.online = value; },
    SET_TAKE_PROFIT(state, value) { state.take_profit = value; },
    SET_SYMBOLS(state, value) { state.symbols = value; },
    SET_SYMBOLS_SETS(state, value) { state.symbols_sets = value; },
    SET_CUR1(state, value) { state.cur1 = value; },
    SET_CUR2(state, value) { state.cur2 = value; },
    SET_DRAWER(state, value) { state.drawer = value; },
    SET_PANIK(state, value) { state.panik = value; },
    SET_VERSION(state, value) { state.version = value; },
    SET_MAINTAINER(state, value) { state.maintainer = value; },
    SET_GITHUB(state, value) { state.github = value; },
    SET_TWITTER(state, value) { state.twitter = value; },
    SET_PROFIT(state, value) { state.profit = value; },
  },
  actions: {
    get_chatterer(state) {
      axios.get(`${state.getters.endpoint}/api/v1/ui/knightrider`).then(response => {
        state.commit('SET_CHATTERER', response.data.chatterer);
      })
    },
    get_version(state) {
      axios.get(`${state.getters.endpoint}/api/v1/ui/version`).then(response => {
        state.commit('SET_VERSION', response.data.version);
      })
    },
    get_profit(state) {
      axios.get(`${state.getters.endpoint}/api/v1/ui/profit`).then(response => {
        state.commit('SET_PROFIT', response.data.profit);
      })
    },
    get_maintainer(state) {
      axios.get(`${state.getters.endpoint}/api/v1/ui/maintainer`).then(response => {
        state.commit('SET_MAINTAINER', response.data.maintainer);
        state.commit('SET_GITHUB', response.data.github);
        state.commit('SET_TWITTER', response.data.twitter);
      })
    },
    get_online(state) {
      axios.get(`${state.getters.endpoint}/api/v1/ui/online`).then(response => {
        state.commit('SET_ONLINE', response.data.online);
      })
    },
    get_currencies(state) {
      axios.get(`${state.getters.endpoint}/api/v1/ui/currency`).then(response => {
        state.commit('SET_CUR1', response.data.cur1);
        state.commit('SET_CUR2', response.data.cur2);
      })
    },
    get_symbols(state) {
      axios.get(`${state.getters.endpoint}/api/v1/ui/symbols`).then(response => {
        state.commit('SET_SYMBOLS', response.data.symbols);
      })
      axios.get(`${state.getters.endpoint}/api/v1/ui/symbols_sets`).then(response => {
        state.commit('SET_SYMBOLS_SETS', response.data.symbols);
      })
    },
    get_take_profit(state) {
      axios.get(`${state.getters.endpoint}/api/v1/configure/take_profit`).then(response => {
        state.commit('SET_TAKE_PROFIT', response.data.take_profit);
      })
    },
    set_take_profit(state, value) {
      if(value != state.take_profit) {
        axios.post(`${state.getters.endpoint}/api/v1/configure/take_profit`, {'tp': value});
      }
    },
    toggle_online(state) {
      axios.get(`${state.getters.endpoint}/api/v1/configure/online`);
    },
    set_cur1(state, value) {
      axios.post(`${state.getters.endpoint}/api/v1/configure/cur1`, {'cur': value}).then(response => {
        state.commit('SET_CUR1', response.data.cur1);
        state.commit('SET_CUR2', response.data.cur2);
      });
    },
    set_cur2(state, value) {
      axios.post(`${state.getters.endpoint}/api/v1/configure/cur2`, {'cur': value}).then(response => {
        state.commit('SET_CUR1', response.data.cur1);
        state.commit('SET_CUR2', response.data.cur2);
      });
    },
    toggle_drawer(state, v) {
      state.state.commit('SET_DRAWER', v);
    },
    set_panik(state, value) {
      axios.post(`${state.getters.endpoint}/api/v1/configure/panik`, {'panik': value}).then(response => {
        state.commit('SET_PANIK', response.data.panik);
      });
    },
  },
  modules: {
  }
})
