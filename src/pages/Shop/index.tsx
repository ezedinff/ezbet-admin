import React, {useEffect} from 'react';
import { useLazyQuery } from 'react-apollo';
import { SHOPS } from '../../shared/graphql/shop.gql';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
import { DataTable } from '../../components/DataTable';
import { shopColumns } from './data';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export const Shop = () => {
    const [getShops, {data: shops, loading: isShopLoading, error: isGettingShopFAiled}] = useLazyQuery(SHOPS);
    const history = useHistory();
    useEffect(() => {
        getShops()
    }, []);

    return isShopLoading || !shops ?
    <FullPageLoader/> :
     (<>
       <DataTable
       extras ={        <Button onClick = {() => history.push("/admin/shops/0")} icon={<PlusOutlined translate/>}>
       Create New Shop
   </Button>}
       columns={shopColumns}
       data={shops.shops}
       title={"Shops"} updateFn={() => {}}/>
     </>)
};
