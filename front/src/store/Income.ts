import Http from "@/services/Http";

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

            store.DefaultIncome = income;
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
            if (context.rootState.auth.AccessToken === "") {
                return new Promise((resolve, reject) => {
                    context.state.TempIncome = false;
                    context.state.DefaultIncome = false;
                    resolve();
                });
            }
            return new Promise((resolve, reject) => {
                Http.request({
                    method: 'get',
                    url: 'api/user-default/income',
                    headers: {'X-AUTH-TOKEN': context.rootState.auth.AccessToken},
                }).then((response) => {
                    context.commit('setIncome',response.data.income);
                    resolve();
                }).catch(() => {
                    const localStorageIncome = window.localStorage.getItem('defaultIncome');

                    if (localStorageIncome !== undefined) {
                        context.commit('setIncome', localStorageIncome);
                    }
                });
            });
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

        sync(context: any) {
            if (context.rootState.auth.AccessToken === '') {
                return;
            }

            let income = context.state.DefaultIncome;

            if (income === false) {
                income = context.state.TempIncome;
            }

            Http.request({
                method: 'post',
                url: 'api/user-default/income',
                data: {
                    income: income
                },
                headers: {'X-AUTH-TOKEN': context.rootState.auth.AccessToken},
            });
        },
    },
};
