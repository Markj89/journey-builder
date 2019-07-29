import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import content from '../public/content.json';

Vue.use(Vuex, axios)
const API_URL = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
});

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
      axios.get('./content.json').then((response) => {
        commit('GET_POST', response.data);
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  getters: {}
})
