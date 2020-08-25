import React, { useEffect } from 'react';
import './index.less';
import { MARKETS, UPDATE_MARKETS } from '../../shared/graphql/market.gql';
import { useLazyQuery, useMutation } from 'react-apollo';
import { UPDATE_LEAGUE } from '../../shared/graphql/league.gql';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
import { DataTable } from '../../components/DataTable';
import { marketColumns } from './data';
export const Market = () => {
    const [getMarkets, {data, loading, error, refetch}] = useLazyQuery(MARKETS);
    const [updateMarket, {data: league, loading: isUpdating, error: isFailed}] = useMutation(UPDATE_MARKETS);
    useEffect(() => {getMarkets()}, []);
    console.log(data);
    return (
         loading || isUpdating || !data ?
          <FullPageLoader/> :
           (<DataTable
             columns={marketColumns}
             data={data.markets}
             title={"Markets"} updateFn={updateMarket}/>)
         );
};