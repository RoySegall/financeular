import Vue from 'vue';
import Vuex from 'vuex';
import Income from './store/Income';
import Budget from './store/Budget';
import Auth from './store/Auth';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: Auth,
        income: Income,
        budget: Budget,
    },
    state: {
        syncWhenLogin: false,
    },
    mutations: {
        /**
         * Setting the sync when login flag.
         *
         * The flag determines if we need to sync the budget template and the
         * income to the DB - i.e override the values in the DB - when the user
         * login.
         *
         * When does this a good action?
         *  1. We want to sync the budget template when a user start to work on
         *  a template.
         *  2. We don't want to sync when a user login when he did not did any
         *  action - that could be a case when was not authenticated but logged
         *  in to the system.
         *
         * @param store
         *  The store object.
         * @param status
         *  The status of the syc when login flag.
         */
        setSyncWhenLogin(store: any, status: boolean) {
            store.syncWhenLogin = status;
        },
    },
    actions: {},
});
