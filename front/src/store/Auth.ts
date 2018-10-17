export default {
    state: {
        AccessToken: '',
    },
    mutations: {
        /**
         * Setting the access token.
         *
         * @param store
         *  The state object.
         * @param {string} at
         *  The access token.
         */
        setAccessToken(store: any, at: string) {
            store.AccessToken = at;
            window.localStorage.setItem('access_token', at);
        }
    },
    actions: {
        /**
         * Listening to the init of the object.
         *
         * @param context
         */
        starting(context: any) {
            let at = window.localStorage.getItem('access_token');

            if (at !== null) {
                context.commit('setAccessToken', at);
            }
        }
    },
}
