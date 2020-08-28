import React, {Fragment} from 'react';
import {Avatar, Badge, Layout, List, Menu, Popover} from 'antd';
import './Header.less';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BellOutlined,
    RightOutlined
} from '@ant-design/icons';
const {SubMenu} = Menu;
export function Header(props: {user: any; collapsed: any; toggle: any; }) {
    const {collapsed, toggle} = props;
    const rightContent = [
        <Menu key="user" mode="horizontal" onClick={() => console.log('logged')}>
            <SubMenu
                title={
                    <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
                Hi
              </span>
                <span style={{textTransform: "capitalize"}}>{`${props.user.firstName} ${props.user.lastName}`}</span>
                        <Avatar style={{ marginLeft: 8 }} src={props.user.profileImage} />
                    </Fragment>
                }
            >
                <Menu.Item key="SignOut">
                    Sign Out
                </Menu.Item>
            </SubMenu>
        </Menu>,
    ];


    rightContent.unshift(
        <Popover
            placement="bottomRight"
            trigger="click"
            key="notifications"
            overlayClassName={"notificationPopover"}
          /*  getPopupContainer={() => document.querySelector('#primaryLayout')}*/
            content={
                <div className={"notification"}>
                    <List
                        itemLayout="horizontal"
                        dataSource={[]}
                        locale={{
                            emptyText:"You have viewed all notifications."
                        }}
                        renderItem={item => (
                            <List.Item className={"notificationItem"}>
                 {/*               <List.Item.Meta
                                    title={
                                        <Ellipsis tooltip lines={1}>
                                            {item.title}
                                        </Ellipsis>
                                    }
                                    description={moment(item.date).fromNow()}
                                />*/}
                                <RightOutlined translate style={{ fontSize: 10, color: '#ccc' }} />
                            </List.Item>
                        )}
                    />
                    {4 ? (
                        <div
                            className={"clearButton"}
                        >
                            Clear notifications
                        </div>
                    ) : null}
                </div>
            }
        >
            <Badge
                count={5}
                dot
                offset={[-10, 10]}
                className={"iconButton"}
            >
                <BellOutlined translate className={'iconFont'} />
            </Badge>
        </Popover>
    );


    return (
      <Layout.Header className="header fixed"  id="layoutHeader">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              translate: '',
              className: 'trigger button',
              onClick: toggle,
          })}
          <div className={"rightContainer"}>{rightContent}</div>
      </Layout.Header>
    );
}