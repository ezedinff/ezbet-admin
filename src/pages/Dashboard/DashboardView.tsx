import React from "react";
import { Board } from "../../components/Board";
import { Card, Col, Row, Table } from "antd";
import {
  boards,
  favMaarketColumns,
  favMarkets,
  favMatches,
  favMatchesColumns,
} from "./data";
import "./index.less";
import { date } from "yup";

const uuidv1 = require("uuid/v1");
const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: "#fff",
  },
};

const DashboardView = (props: any) => {
  const { boardCountData } = props;
  const getBoards = () =>
    boards.map((board, index) => {
      const countData = boardCountData.find(
        (item: any) => item.title === board.title
      );
      return (
        <Col key={index} md={8}>
          <Board
            key={board.key}
            number={countData ? countData.count : 0}
            title={board.title}
            color={board.color}
            icon={board.icon}
          />
        </Col>
      );
    });
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
    <Row gutter={24}>
      {getBoards()}
      {getTable(favMatchesColumns, favMatches, "Favourite Matches")}
      {getTable(favMaarketColumns, favMarkets, "Favourite Markets")}
    </Row>
  );
};

export default DashboardView;
