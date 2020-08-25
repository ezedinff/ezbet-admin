import React, { useEffect } from 'react';
import './index.less';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { LEAGUES, UPDATE_LEAGUE } from '../../shared/graphql/league.gql';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
import { DataTable } from '../../components/DataTable';
import { leagueColumns, leagueForm } from './data';

export const League = () => {
    const [getLeagues, {data, loading, error, refetch}] = useLazyQuery(LEAGUES);
    const [updateLeague, {data: league, loading: isUpdating, error: isFailed}] = useMutation(UPDATE_LEAGUE);
    useEffect(() => {getLeagues()}, []);
    return (
         loading || isUpdating || !data ?
          <FullPageLoader/> :
           (<DataTable
            formElements={leagueForm}
            formData={{selectValues: {country: [{label: "Ethiopia", value: "Ethipia"}]}}}
             columns={leagueColumns}
             data={data.leagues}
             title={"Leagues"} updateFn={updateLeague}/>)
         );

};