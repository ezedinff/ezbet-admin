import React, { useEffect } from "react";
import { useLazyQuery } from "react-apollo";
import { SHOPS } from "../../shared/graphql/shop.gql";
import { FullPageLoader } from "../../components/Loaders/FullPageLoader";
import { DataTable } from "../../components/DataTable";
import { shopColumns } from "./data";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const uuidv1 = require("uuid/v1");

export const Shop = () => {
  const [
    getShops,
    { data: shops, loading: isShopLoading, error: isGettingShopFAiled },
  ] = useLazyQuery(SHOPS);
  const history = useHistory();
  useEffect(() => {
    getShops();
    if (!shopColumns.find((column) => column.title === "Actions")) {
      shopColumns.push(actions);
    }
  }, []);

  const actions: any = {
    key: uuidv1(),
    title: "Actions",
    render: (record: any) => (
      <Button
        type="primary"
        icon={<EditOutlined translate="true" />}
        onClick={() => history.push("/admin/shops/" + record._id)}
      />
    ),
  };

  return isShopLoading || !shops ? (
    <FullPageLoader />
  ) : (
    <DataTable
      extras={
        <Button
          onClick={() => history.push("/admin/shops/0")}
          icon={<PlusOutlined translate="true" />}
        >
          Create New Shop
        </Button>
      }
      columns={shopColumns}
      data={shops.shops}
      title={"Shops"}
      updateFn={() => {}}
    />
  );
};
