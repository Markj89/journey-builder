import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)
const API_URL = window.URL.href  ? 'http://journeybuilder.maropost.com/' : 'http://localhost:8080/';

export default new Vuex.Store({
  debug: true,
  state: {
    //lines: [],
    dummyData:[],
  },
  mutations: {
    GET_POST(state, dummyData) {
      state.dummyData = dummyData;
    },
    setContent(state, dummyData) {
      state.dummyData = dummyData;
    }
  },
  actions: {
    async getDummyData( { commit } ) {
      axios.get(`${API_URL}content.json`).then((response) => {
        commit('GET_POST', response.data);
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  getters: {}
})
