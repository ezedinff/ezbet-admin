import {Layout, Menu} from "antd";
import React from 'react';
import {SliderMenu} from "./SliderMenu";
import './sider.less'
import PerfectScrollbar from '../Scrollbar';

export function Sider(props: { menus: any; collapsed: any; onCollapsed: any; appName: string, appLogo: string }) {
    const {menus, collapsed, onCollapsed} = props;
    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            className={"sider"}
            breakpoint="lg"
            trigger={null}
        >
            <div className={"brand"}>
                <div className={"logo"}>
                    <img alt="logo" src={props.appLogo} />
                   {/* {!collapsed && <h1>{props.appName}</h1>}*/}
                </div>
            </div>
           <div className={"menuContainer"}>
               <PerfectScrollbar
                   options={{
                       // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
                       suppressScrollX: true,

                   }}>
                   <SliderMenu menus={menus} collapsed={collapsed}/>
               </PerfectScrollbar>
           </div>
        </Layout.Sider>
    );
}