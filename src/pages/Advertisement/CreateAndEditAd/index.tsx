import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { FullPageLoader } from "../../../components/Loaders/FullPageLoader";
import AdForm from "./AdForm";
import { APP } from "../../../shared/graphql/app.gql";

const CreateAndEditAd = () => {
  const { id }: any = useParams();

  const mode = id === "0" ? "CREATE" : "EDIT";

  const { data, loading, error } = useQuery(APP);

  if (mode === "CREATE") {
    return (
      <AdForm
        mode="CREATE"
        appId={data.app._id}
        ads={data.app.advertisements}
      />
    );
  }

  if (loading) {
    return <FullPageLoader />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <AdForm
      mode="EDIT"
      ads={data.app.advertisements}
      adToEditId={id}
      appId={data.app._id}
    />
  );
};
export default CreateAndEditAd;
