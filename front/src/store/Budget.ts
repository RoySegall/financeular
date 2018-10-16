export default {
    state: {
        BudgetTemplate: {},
    },
    mutations: {
        setBudgetTemplate(store: any, budgetTemplate: any) {
            store.BudgetTemplate = budgetTemplate;
        },
        saveBudgetForNextTime(store: any, budget: any) {
            window.localStorage.setItem('budgetTemplate', JSON.stringify(budget));
        },
        clearBudgetTemplate(store: any) {
            window.localStorage.removeItem('budgetTemplate');
        }
    },
    actions: {
        /**
         * Listening to the init of the object.
         *
         * @param context
         */
        starting(context: any) {
            let budgetFromData: any = window.localStorage.getItem('budgetTemplate');

           if (budgetFromData === null) {
               budgetFromData = [];
           }
           else {
               budgetFromData = JSON.parse(budgetFromData);
           }

            if (budgetFromData !== null) {
                context.commit('setBudgetTemplate', budgetFromData);
            }
        }
    },
}
