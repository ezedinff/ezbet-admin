import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Button, Space } from "antd";
import { FullPageLoader } from "../../components/Loaders/FullPageLoader";
import { DataTable } from "../../components/DataTable/index";
import { PlusOutlined } from "@ant-design/icons";
import { APP } from "../../shared/graphql/app.gql";
import addColumns from "./data";

const uuidv1 = require("uuid/v1");

export const Advertisement = () => {
  const { data, loading, error } = useQuery(APP);
  const history = useHistory();

  const actions: any = {
    key: uuidv1(),
    title: "Actions",
    render: (record: any) => {
      return (
        <Space size="small">
          <Button onClick={() => console.log(record)}>View</Button>
          <Button
            onClick={() => history.push(`/admin/advertisements/${record.id}`)}
          >
            Edit
          </Button>
          <Button onClick={() => alert(JSON.stringify(record) + "Deleted")}>
            Delete
          </Button>
        </Space>
      );
    },
  };


  useEffect(() => {
    if (!addColumns.find((col) => col.title === "Actions")) {
      addColumns.push(actions);
    const onFinish = () => {}
    const onSave = () => {
        let ads = appData.app.advertisements;
        ads = ads.map((ad: any) => ({id: ad.id, name: ad.name, position: ad.position, imagePath: ad.imagePath}))
        ads = [...ads, form.getFieldsValue()];
        updateApp({
            variables: {
                id: appData.app._id,
                appInput: {
                    advertisements: ads
                }
            }
        })
        setOpen(false);
    }
  }, []);

  if (loading) {
    return <FullPageLoader />;
  }
  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <DataTable
      data={data.app.advertisements}
      columns={addColumns}
      title={"Advertisement Banners"}
      updateFn={() => {}}
      extras={
        <Button
          icon={<PlusOutlined translate="true" />}
          onClick={() => history.push("/admin/advertisements/0")}
        >
          Create Ad
        </Button>
      }
    />
  );
};
