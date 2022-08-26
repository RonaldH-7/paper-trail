import { StoredCode } from "./stored-code.interface"

export interface User {
    name: string,
    email: string,
    groups: StoredCode[],
    notifications: string[],
    expenses: string[],
    income: string[]
};