import React, { useEffect, useState } from 'react';
import './index.less';
import {Table} from "antd";
import { fixtures, fixturesColumns, FixtureFilter, fixtureFilterForm } from './data';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { FIXTURES, UPDATE_FIXUTRE } from '../../shared/graphql/fixture.gql';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
import { DataTable } from '../../components/DataTable';
import { LEAGUES } from '../../shared/graphql/league.gql';

export const Fixture = () => {
    const initalValues = {
       // sport: "Soccer",
        isAvailable: true,
        status: "NS"
    };
    const [filter, setFilter] = useState<FixtureFilter>(initalValues);
    const [getFixtures, {data, loading, error, refetch}] = useLazyQuery(FIXTURES);
    const [updateFixture, {data: league, loading: isUpdating, error: isFailed}] = useMutation(UPDATE_FIXUTRE);
    
    const [getLeagues, {data: leagues, loading: leagueLoading, error: leagueFailed, refetch: leagueRefect}] = useLazyQuery(LEAGUES);
    
    
    useEffect(() => {
        getFixtures({variables: initalValues});
        getLeagues();
    }, []);

    const rowSelection = {
        hideSelectAll: true,
        selectedRowKeys: fixtures.filter(fixture => fixture.isAvailable).map(fixture => fixture.key),
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
/*        getCheckboxProps: (record: { name: string; }) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),*/
    };
    const parseLeagues = () => {
        if (!leagueFailed) {
            return leagues.leagues.map((league: any) => ({label: league.name, value: league.id}))
        }
    }
    const updateFilter = (filters: any) => {
        console.log(filters, "From Fixture");
        setFilter(filters);
        // @ts-ignore
        getFixtures({
            variables: {...filters, league: filters.league ? Number(filters.league) : filters.league}
        })
    }
    return (
        loading || isUpdating || !data || leagueLoading? 
         <FullPageLoader/> :
          (<DataTable
           onSubmit={updateFilter}
           formElements={fixtureFilterForm}
           formData={{
               intialValues: filter,
               selectValues: {
                   league: !!leagues ? leagues.leagues.map((league: any) => ({label: league.name, value: league.id})): [],
                   status: [{label: "Not Started", value: "NS"}],
                   isAvailable: [{label: "Enabled", value: true}, {label: "Disabled", value: false}],
                   sport: [{label: "Soccer", value: "soccer"}]
                }
            }}
            columns={fixturesColumns}
            data={data.fixtures.map((fixture: any) => {
                const league = !!leagues ? leagues.leagues.find((l: any) => l.id == fixture.league) : undefined;
                return {...fixture, sport: "Soccer", league: !!league ? league.name : fixture.league}
            })}
            title={"Fixures"} updateFn={updateFixture}/>)
        );
};