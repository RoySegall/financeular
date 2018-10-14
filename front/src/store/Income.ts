export default {
    state: {
        DefaultIncome: 0,
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
        }
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
