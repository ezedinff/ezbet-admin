import React from 'react';
import { Route, useHistory } from 'react-router-dom';
interface IPrivateRoute {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}
// @ts-ignore
export const PrivateLayout = ({ children, ...props }) => {
    const history = useHistory();
    if (localStorage.getItem('token')) {
        history.push('/');
    }
    return <Route {...props}>{children}</Route>;
};