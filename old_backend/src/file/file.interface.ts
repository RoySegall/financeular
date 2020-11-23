export interface parseSheet extends parsedSheetName {
    results: unknown,
}

export interface parsedSheetName {
    month: string,
    year: number,
}

export interface Income {
    title: any;
    value: any;
}

export interface Limitation {
    total_value: any;
    value_per_week: any;
    description: any;
    time_per_month: any;
    title: any;
}

export interface Expense {
    value: any;
    date: any;
    title: any;
}

export interface ParsedSheetRow {
    limitation: Limitation;
    income: Income;
    expense: Expense;
}

export interface ParsedFile {
    currency: string,
    template: string,
    months: {
        [key: string]: ParsedSheetRow[],
    }
}
