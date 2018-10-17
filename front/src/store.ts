import Vue from 'vue';
import Vuex from 'vuex';
import Income from './store/Income';
import Budget from './store/Budget';
import Auth from './store/Auth';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        income: Income,
        budget: Budget,
        auth: Auth,
    },
    state: {
    },
    mutations: {
    },
    actions: {},
});
