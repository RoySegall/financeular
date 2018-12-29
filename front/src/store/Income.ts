export default {
    state: {
        DefaultIncome: 0,
        TempIncome: 0,
    },
    mutations: {
        /**
         * Setting the default income.
         *
         * @param store
         *  The store object.
         * @param {number} income
         *  The value of the income.
         */
        setIncome(store: any, income: number) {
            store.DefaultIncome = income;
        },
        /**
         * Save the income.
         *
         * @param store
         *  The store object.
         * @param {number} income
         *  The income to save.
         */
        saveIncome(store: any, income: number) {
            window.localStorage.setItem('defaultIncome', income.toString());

            // todo: handle DB saving.
            store.DefaultIncome = income;

            // todo: check if we have access token. If yes - update the backend.
        },
        /**
         * Setting the income as the temp income so we would know to save after the user is logged in.
         *
         * @param store
         *  The state object.
         * @param {number} tempIncome
         *  The temp income.
         */
        setTempIncome(store: any, tempIncome: number) {
          store.TempIncome = tempIncome;
        },
        /**
         * Removing the temp income.
         *
         * @param store
         *  The state object.
         */
        clearTempIncome(store: any) {
            store.TempIncome = 0;
        },
        /**
         * Remove the default income.
         *
         * @param store
         */
        clearDefaultIncome(store: any) {
            window.localStorage.removeItem('defaultIncome');
        },
    },
    actions: {
        /**
         * Listening to the init of the object.
         *
         * @param context
         */
        starting(context: any) {
            const localStorageIncome = window.localStorage.getItem('defaultIncome');

            if (localStorageIncome !== undefined) {
                context.commit('setIncome', localStorageIncome);
            }
        },
        /**
         * Invoking action when the user is logging out.
         *
         * @param context
         */
        logout(context: any) {
            // Remove teh default income and the temp income.
            context.commit('clearDefaultIncome');
            context.commit('clearTempIncome');
        },
    },
};
