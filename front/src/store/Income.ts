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
        },
        /**
         * Setting the income as the temp income so we would know to save after the user is logged in.
         *
         * @param store
         *  The state object.
         * @param {number} temp_income
         *  The temp income.
         */
        setTempIncome(store: any, temp_income: number) {
          store.TempIncome = temp_income;
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
            let localStorageIncome = window.localStorage.getItem('defaultIncome');

            if (localStorageIncome !== undefined) {
                context.commit('setIncome', localStorageIncome);
            }
        }
    },
}
