import React, {Suspense, useEffect} from 'react';
import {FullPageLoader} from "../../components/Loaders/FullPageLoader";
import Login from "../../components/Login";
import {useLazyQuery} from "@apollo/react-hooks";
import {APP} from "../../shared/graphql/app.gql";

export default function() {
    const [app, {data, loading, error, refetch}] = useLazyQuery(APP);
    useEffect(() => {app()}, []);
    return loading ? <FullPageLoader/> : (
        <Suspense fallback={<FullPageLoader />}>
            <Login data={data}/>
        </Suspense>
    );
};
