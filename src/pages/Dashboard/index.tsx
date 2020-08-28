import React from 'react';
import {Page} from "../../components/Page";
import {Board} from "../../components/Board";
import {Card, Col, Row, Table} from "antd";
import './index.less';
import {boards, favMaarketColumns, favMarkets, favMatches, favMatchesColumns} from "./data";
const uuidv1 = require('uuid/v1');
const bodyStyle = {
    bodyStyle: {
        height: 432,
        background: '#fff',
    },
}

export const Dashboard = () => {
    const getBoards = () => boards.map((board, index) =>
        (
            <Col key={index} md={8}>
                <Board key={board.key} number={board.number} title={board.title} color={board.color} icon={board.icon}/>
            </Col>
        )
    );
    // @ts-ignore
    const getTable = (columns, data, title) => (
        <Col lg={12} md={24}>
            <Card title={title} bordered={false} {...bodyStyle}>
                <Table
                    pagination={false}
                    columns={columns}
                    dataSource={data}
                    rowKey={uuidv1() + Date.now()}
                />
            </Card>
        </Col>
    );
    return (
        <Page loading={true} classname={"dashboard"}>
            <Row gutter={24}>
                {getBoards()}
                {getTable(favMatchesColumns, favMatches, "Favourite Matches")}
                {getTable(favMaarketColumns, favMarkets, "Favourite Markets")}
            </Row>
{/*            <p>favorite matches and favorite market</p>*/}
        </Page>
    )
};