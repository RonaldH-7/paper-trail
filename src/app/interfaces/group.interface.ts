export interface Group {
    name: string,
    members: string[],
    creator: string,
    expenses: string[],
    income: string[],
    categories: string[],
    isDeletable: boolean
};