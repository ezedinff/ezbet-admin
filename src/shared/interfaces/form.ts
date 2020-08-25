export enum FormType {
    TEXT = "TEXT",
    NUMBER = "NUMBER",
    SELECT = "SELECT",
    password = "PASSWORD",
}

export interface Form {
    name: string;
    label: string;
    type: FormType;
    values?: [{label: string; value: any}]
}