import {Layout, Menu} from "antd";
import React from 'react';
import {SliderMenu} from "./SliderMenu";
import './sider.less'
import Scrollbar from '../Scrollbar';

export function Sider(props: { menus: any; collapsed: any; onCollapsed: any; }) {
    const {menus, collapsed, onCollapsed} = props;
    return (
        <Layout.Sider
            width={256}
            collapsible
            collapsed={collapsed}
            className={"sider"}
            breakpoint="lg"
            trigger={null}
        >
            <div className={"brand"}>
                <div className={"logo"}>
                    <img alt="logo" src={""} />
                    {!collapsed && <h1>{"EziBet"}</h1>}
                </div>
            </div>
           <div className={"menuContainer"}>
               <Scrollbar
                   options={{
                       // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
                       suppressScrollX: true,
                   }}>
                   <SliderMenu menus={menus} collapsed={collapsed}/>
               </Scrollbar>
           </div>
        </Layout.Sider>
    );
}