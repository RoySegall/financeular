export default {
    state: {
        BudgetTemplate: {},
    },
    mutations: {
        setBudgetTemplate(store: any, budgetTemplate: number) {
            store.BudgetTemplate = budgetTemplate;
        },
        saveBudgetForNextTime(store: any) {
            // Setting in the index db.
        }
    },
    actions: {
        /**
         * Listening to the init of the object.
         *
         * @param context
         */
        starting(context: any) {
            // Load from index DB.
            let budgetFromData = {};

            if (budgetFromData !== {}) {
                context.commit('setBudgetTemplate', budgetFromData);
            }
        }
    },
}
