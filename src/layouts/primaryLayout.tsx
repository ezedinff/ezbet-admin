import React, {Fragment, useState} from 'react';
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

const { Content } = Layout;

// Todo this component should handle if the data
export default function PrimaryLayout(){
    const [collapsed, setCollapsed] = useState(false);
    function toggle() {
        setCollapsed(!collapsed);
    }
    // check for authentication,
    // TODO if the device is mobile make it drawer
    return (
        <Layout>
            <Sider menus={childRoutes} collapsed={collapsed} onCollapsed={toggle}/>
            <Layout className={"container"}>
                <Header collapsed={collapsed} toggle={toggle}/>
                <div >
                    <Content className={"content"}>
                        <Redirect to={"/admin/dashboard"}/>
                        {childRoutes.map((route, index) => <Route component={route.component} path={route.path} key={index}/>) }
                    </Content>
                    <GlobalFooter className={"globalFooter"} copyright={"c"} key={"footer"} links={[]}/>
                </div>
            </Layout>
        </Layout>
    );
}
