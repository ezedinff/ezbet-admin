import React, { useEffect } from 'react';
import {Col, Row} from "antd";
import {AppSetting} from "./AppSetting";
import {ProfileSetting} from "./ProfileSetting";
import {RuleSetting} from "./RuleSetting";
import { useLazyQuery } from 'react-apollo';
import { CURRENT_USER } from '../../shared/graphql/user.gql';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
import { APP } from '../../shared/graphql/app.gql';
export const Setting = () => {
    const [getUser, {data, loading, error, refetch}] = useLazyQuery(CURRENT_USER);
    const [app, {data: appData, loading: appLoading, error: appError, refetch: appRef}] = useLazyQuery(APP);

    // @TODO if the referesh token present request for new access token
    useEffect(() => {
        getUser();
        app();
    }, [])
    return loading || appLoading || !appData || !data ?  <FullPageLoader/> :(
        <Row gutter={24}>
            <Col lg={12} md={24} style={{marginBottom: "24px"}}>
                <AppSetting user={data.whoami} app={appData.app}/>
            </Col>
            <Col lg={12} md={24} style={{marginBottom: "24px"}}>
                <ProfileSetting user={data.whoami}/>
            </Col>
            <Col lg={24} md={24} style={{marginBottom: "24px"}}>
                <RuleSetting app={appData.app}/>
            </Col>
        </Row>
    );
};