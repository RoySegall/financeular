import Http from "@/services/Http";

export default {
    state: {
        BudgetTemplate: {},
    },
    mutations: {
        /**
         * Setting the budget template in the state.
         *
         * @param store
         *  The state object.
         * @param budgetTemplate
         *  The budget object.
         */
        setBudgetTemplate(store: any, budgetTemplate: any) {
            store.BudgetTemplate = budgetTemplate;
        },

        /**
         * Setting the budget for next time.
         *
         * @param store
         *  The state object.
         * @param budget
         *  The budget.
         */
        saveBudgetForNextTime(store: any, budget: any) {
            window.localStorage.setItem('budgetTemplate', JSON.stringify(budget));
        },

        /**
         * Clearing the budget object.
         * @param store
         */
        clearBudgetTemplate(store: any) {
            window.localStorage.removeItem('budgetTemplate');
        },

        /**
         * Remove the a given item from the block list.
         *
         * @param store
         *  The store object.
         * @param indicators
         *  An object of indicators with the keys: block and item.
         */
        removeItem(store: any, indicators: any) {
            let items = store.BudgetTemplate[indicators.block].items;

            items = items.filter((value: any, index: number) => {
                return index !== indicators.item;
            });

            store.BudgetTemplate[indicators.block].items = items;
        },

        /**
         * Remove a given number.
         *
         * @param store
         *  The store object.
         * @param {number} block
         *  The block index.
         */
        removeBlock(store: any, block: any) {
            store.BudgetTemplate = store.BudgetTemplate.filter((value: any, index: any) => {
                return index !== block;
            });
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
                    context.commit('setBudgetTemplate', {});
                    resolve();
                });
            }
            return new Promise((resolve, reject) => {
                Http.request({
                    method: 'get',
                    url: 'api/user-default/template',
                    headers: {'X-AUTH-TOKEN': context.rootState.auth.AccessToken},
                }).then((response) => {
                    context.commit('setBudgetTemplate',response.data.template);
                    resolve();
                }).catch(() => {
                    let budgetFromData: any = window.localStorage.getItem('budgetTemplate');

                    if (budgetFromData === null) {
                        budgetFromData = [];
                    } else {
                        budgetFromData = JSON.parse(budgetFromData);
                    }

                    if (budgetFromData !== null) {
                        context.commit('setBudgetTemplate', budgetFromData);
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
            // Clearing up the template the local storage template.
            context.commit('clearBudgetTemplate');
        },

        sync(context: any) {
            Http.request({
                method: 'post',
                url: 'api/user-default/template',
                data: {
                    template: context.state.BudgetTemplate
                },
                headers: {'X-AUTH-TOKEN': context.rootState.auth.AccessToken},
            }).then((response) => {
                console.log(response);
            });
        },
    },
};
