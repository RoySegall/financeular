import Vue from 'vue';
import Vuex from 'vuex';
import Income from './store/Income';
import Budget from './store/Budget';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        income: Income,
        budget: Budget,
    },
    state: {
    },
    mutations: {
    },
    actions: {},
});
