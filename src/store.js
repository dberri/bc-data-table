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

    UPDATE_PAYMENT: (state, payload) => {
      const idx = state.payments.findIndex(item => item.ID === payload.ID);
      state.payments[idx] = payload;
    },
  },

  actions: {
    loadPayments: () => {
      axios.get('/payments.json').then((response) => {
        response.data.forEach((item) => {
          db.collection('payments')
            .doc(item.ID)
            .set(item);
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

    updatePayment: ({ commit }, payload) => {
      db.collection('payments')
        .doc(payload.ID)
        .set(payload)
        .then(() => {
          commit('UPDATE_PAYMENT', payload);
        });
    },
  },
});
