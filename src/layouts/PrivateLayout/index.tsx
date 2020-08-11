import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import {LOCAL_STORAGE_TEMPLATE} from "../../enumerations";
interface IPrivateRoute {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}
// @ts-ignore
export const PrivateLayout = ({ children, ...props }) => {
    const history = useHistory();
    if (!localStorage.getItem(LOCAL_STORAGE_TEMPLATE.token)) {
        console.log(!localStorage.getItem('token'));
        history.push('/');
    }
    return <Route {...props}>{children}</Route>;
};