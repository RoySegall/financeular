export default {
    state: {
        BudgetTemplate: {},
        TempBudgetTemplate: {},
    },
    mutations: {
        setBudgetTemplate(store: any, budgetTemplate: number) {
            store.BudgetTemplate = budgetTemplate;
        },
        setTempBudgetTemplate(store: any, tempBudgetTemplate: any) {
            store.TempBudgetTemplate = tempBudgetTemplate;
        }
    },
}
