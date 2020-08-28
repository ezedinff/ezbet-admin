export enum FormType {
    TEXT = "TEXT",
    NUMBER = "NUMBER",
    SELECT = "SELECT",
    PASSWORD = "PASSWORD",
    DATE = "DATE"
}
export interface Form {
    name: string;
    label: string;
    type: FormType;
    values?: [{label: string; value: any}]
}