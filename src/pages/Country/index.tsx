import React, {useEffect} from 'react';
import './index.less';
import {Table} from "antd";
import {countries, countryColumns} from "./data";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {SPORTS, UPDATE_SPORT} from "../../shared/graphql/sport.gql";
import {FullPageLoader} from "../../components/Loaders/FullPageLoader";
import {DataTable} from "../../components/DataTable";
import {COUNTRIES} from "../../shared/graphql/country.gql";
export const Country = () => {
    const [getCountries, {data, loading, error, refetch}] = useLazyQuery(COUNTRIES);
    const [updateCountry, {data: country, loading: isUpdating, error: isFailed}] = useMutation(UPDATE_SPORT);
    useEffect(() => {getCountries()}, []);
    return loading || !data ? <FullPageLoader/> : (<DataTable columns={countryColumns} data={data.countries} title={"Countries"} updateFn={updateCountry}/>);
};

// component takes query type and manage accordingly