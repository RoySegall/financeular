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
        },
        removeAccessToken(store: any) {
            store.AccessToken = '';
            window.localStorage.removeItem('access_token');
        },
    },
    actions: {
        /**
         * Listening to the init of the object.
         *
         * @param context
         */
        starting(context: any) {
            const at = window.localStorage.getItem('access_token');

            if (at !== null) {
                context.commit('setAccessToken', at);
            }
        },
        /**
         * Invoking action when the user is logging out.
         *
         * @param context
         */
        logout(context: any) {
            // Remvoving the access token.
            context.commit('removeAccessToken');

            // todo: invalidate the token in the DB.
        },
    },
};
