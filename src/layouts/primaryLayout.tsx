import React, {Fragment, useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {Sider} from "../components/layout/Sider";
import './primaryLayout.less';
import {Header} from "../components/layout/Header";
import {GlobalFooter} from "../components/GlobalFooter";
import {childRoutes} from "../route";
import {Redirect, Route} from "react-router";
import {useLazyQuery} from "@apollo/react-hooks";
import {APP} from "../shared/graphql/app.gql";
import {FullPageLoader} from "../components/Loaders/FullPageLoader";
import PerfectScrollbar from "../components/Scrollbar";
import { CURRENT_USER } from '../shared/graphql/user.gql';

const { Content } = Layout;

// Todo this component should handle if the data
export default function PrimaryLayout(){
    const [collapsed, setCollapsed] = useState(false);
    const [app, {data, loading, error, refetch}] = useLazyQuery(APP);
    const [getUser, {data: userData, loading: uL, error: uE, refetch: uR}] = useLazyQuery(CURRENT_USER);
    // @TODO if the referesh token present request for new access token
    useEffect(() => {app(); getUser()}, []);
    function toggle() {
        setCollapsed(!collapsed);
    }
    // check for authentication,
    // TODO if the device is mobile make it drawer
    return loading || uL || !userData  || !data ? <FullPageLoader/> : (
        <Layout>
            <Sider  appLogo={data.app.appLogo} appName={data.app.appName} menus={childRoutes} collapsed={collapsed} onCollapsed={toggle}/>
            <Layout className={"container"}>
                <Header user={userData.whoami} collapsed={collapsed} toggle={toggle}/>
                <PerfectScrollbar
                        options={{
                            // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
                            suppressScrollX: true,

                        }}>
                        <Content className={"content"}>
                            <Redirect to={"/admin/dashboard"}/>
                            {childRoutes.map((route, index) => <Route component={route.component} exact path={route.path} key={index}/>) }
                        </Content>
                </PerfectScrollbar>
                <GlobalFooter
                 className={"globalFooter"} copyright={"Copyright © All right reserved"} key={"footer"} links={[
                     "https://ezbet.com"
                 ]}/>
            </Layout>
        </Layout>
    );
}
