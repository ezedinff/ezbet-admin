import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import {LOCAL_STORAGE_TEMPLATE} from "../../enumerations";
import { CURRENT_USER } from '../../shared/graphql/user.gql';
import { useLazyQuery } from '@apollo/react-hooks';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
interface IPrivateRoute {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}
// @ts-ignore
export const PrivateLayout = ({ children, ...props }) => {
    const [getUser, {data, loading, error, refetch}] = useLazyQuery(CURRENT_USER);
    // @TODO if the referesh token present request for new access token
    useEffect(() => {getUser()}, [])
    const history = useHistory();
    if (loading) {
        return <FullPageLoader/>;
    }
    if (error) {
        console.log(error);
        history.push('/');
    }
    return <Route {...props}>{children}</Route>;
};