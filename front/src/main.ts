import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Initing all the modules of the state.
store.dispatch('starting').then(() => {
    // Once we got the data from the server we can mount the app.
    new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount('#app');
});
