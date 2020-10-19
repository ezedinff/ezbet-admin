import React from "react";
const uuidv1 = require("uuid/v1");
const addColumns = [
  {
    key: uuidv1(),
    title: "Name",
    dataIndex: "name",
  },
  {
    key: uuidv1(),
    title: "Ad Image",
    dataIndex: "imagePath",
    render: (text: string) => (
      <img src={text} alt="avatar" style={{ width: "200px" }} />
    ),
  },
  {
    key: uuidv1(),
    title: "Status",
    dataIndex: "isAvailable",
  },
  {
    key: uuidv1(),
    title: "Position",
    dataIndex: "position",
  },
];
export default addColumns;
