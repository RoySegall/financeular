export default {
    state: {
        AccessToken: '',
        RefreshToken: '',
        Expires: 0
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
        setAccessToken(store: any, at: AccessToken) {
            store.AccessToken = at.access_token;
            store.RefreshToken = at.refresh_token;
            store.Expires = at.expires;

            window.localStorage.setItem('access_token', at.access_token);
            window.localStorage.setItem('refresh_token', at.refresh_token);
            window.localStorage.setItem('expires', at.expires);
        },

        /**
         * Remove the access token.
         *
         * @param store
         *  The store object.
         */
        removeAccessToken(store: any) {
            store.AccessToken = '';
            store.RefreshToken = '';
            store.Expires = '';

            window.localStorage.removeItem('access_token');
            window.localStorage.removeItem('refresh_token');
            window.localStorage.removeItem('expires');
        },
    },
    actions: {
        /**
         * Listening to the init of the object.
         *
         * @param context
         */
        starting(context: any) {
            return new Promise((resolve, reject) => {
                // todo: handle if the access token if expires ot not.
                context.state.Expires = window.localStorage.getItem('expires');

                const currentTimeStamp = new Date().getTime() / 1000;

                if (currentTimeStamp > context.state.Expires) {
                    // Logging out sine the access token is no longer valid.
                    context.dispatch('logout');
                    resolve();
                    return;
                }

                context.state.AccessToken = window.localStorage.getItem('access_token');
                context.state.RefreshToken = window.localStorage.getItem('refresh_token');
                resolve();
            });
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
