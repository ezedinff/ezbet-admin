export enum FormType {
    TEXT = "TEXT",
    NUMBER = "NUMBER",
    password = "PASSWORD",
}

export interface Form {
    name: string;
    label: string;
    type: FormType;
}