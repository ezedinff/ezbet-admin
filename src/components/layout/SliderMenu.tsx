import PropTypes from 'prop-types'
import React from 'react';
import {Menu} from 'antd';
import {SideMenu} from "../../config/menu";
import { Icon as LegacyIcon } from '@ant-design/compatible'
import {NavLink} from 'react-router-dom';

export function SliderMenu(props: { menus: []; collapsed: boolean }) {
    const {menus} = props;
    const generateMenus = (menus: SideMenu[]) => menus.map(menu => (
        menu.name ?
        <Menu.Item  key={menu.name}>
            <NavLink to={menu.path}>
                {menu.icon && <LegacyIcon type={menu.icon} />}
                {!props.collapsed ? menu.name: null}
            </NavLink>
            </Menu.Item> : null
    ));
    return (
        <Menu className={"menu"}>
            {generateMenus(menus)}
        </Menu>
    );
}
SliderMenu.prototype = {
    menus: PropTypes.array,
};