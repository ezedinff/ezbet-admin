import React, {useEffect} from 'react';
import './index.less';
import {sportColumns} from "./data";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {SPORTS, UPDATE_SPORT} from "../../shared/graphql/sport.gql";
import {FullPageLoader} from "../../components/Loaders/FullPageLoader";
import {DataTable} from "../../components/DataTable";

export const Sport = () => {
    const [getSports, {data, loading, error, refetch}] = useLazyQuery(SPORTS);
    const [updateSport, {data: sport, loading: isUpdating, error: isFailed}] = useMutation(UPDATE_SPORT);
    useEffect(() => {getSports()}, []);
    return loading || !data ? <FullPageLoader/> : (<DataTable columns={sportColumns} data={data.sports} title={"Sports"} updateFn={updateSport}/>);
};