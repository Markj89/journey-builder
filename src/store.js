import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import ui from './ux/ui';

//const BASE_URL = 'http://localhost:3000/'; MongoDB
const BASE_URL = './content.json'; // Basic Dummy Data

Vue.use(Vuex, axios);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  modules: {
    ui
  },
  debug: true,
  state: {
    dummyData: [],
    someGlobalState: null,
  },
  mutations: {
    GET_POST(state, dummyData) {
      state.dummyData =  dummyData;
    },
    setContent(state, dummyData) {
      state.dummyData =  dummyData;
    },
    SET_MUTATION(state, responseData) {
      state.someGlobalState = responseData;
    }
  },
  actions: {
    async subscriptionData({ commit }, opts) {
      return axios.post(`${API}`, opts).then((res) => {
        commit('POST_MUTATION', res.data);
      });
    },
    async getDummyData( { commit } ) {
      axios.get(`${BASE_URL}`, {
        useCredentails: true,
        crossdomain: true,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }).then(function(response) {
        commit('GET_POST', response.data);
      }).catch(function(error) {
        if (error.response) {
          console.log(error.response.headers);
        }
      });
    },
  },
})
