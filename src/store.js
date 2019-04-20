import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import db from './db';

function uploadToFirebase(data) {
  data.forEach((item) => {
    db.collection('payments')
      .doc(item.ID)
      .set(item);
  });
}

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
    updatePayment: ({ commit }, payload) => {
      db.collection('payments')
        .doc(payload.ID)
        .set(payload)
        .then(() => {
          commit('UPDATE_PAYMENT', payload);
        });
    },

    async fetchPayments({ commit }) {
      const querySnapshots = await db.collection('payments').get();
      if (querySnapshots.docs.length) {
        commit('STORE_PAYMENTS', querySnapshots.docs.map(doc => doc.data()));
      } else {
        const { data } = await axios.get('/payments.json');
        commit('STORE_PAYMENTS', data);
        uploadToFirebase(data);
      }
    },
  },
});
