import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import db from './db';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    payments: [],
  },

  mutations: {
    STORE_PAYMENTS: (state, payload) => {
      state.payments = payload;
    },
  },

  actions: {
    loadPayments: () => {
      axios.get('/payments.json').then((response) => {
        response.data.forEach((item) => {
          db.collection('payments').add(item);
        });
      });
    },

    fetchPayments: ({ commit }) => {
      db.collection('payments')
        .get()
        .then((querySnapshots) => {
          commit('STORE_PAYMENTS', querySnapshots.docs.map(doc => doc.data()));
        });
    },
  },
});
