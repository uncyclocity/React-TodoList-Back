const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config();

server.use(express.json());

server.use(cors());

const getAccessToken = require("./api/getAccessToken");

server.use("/api/getAccessToken", getAccessToken);

server.get("/", (req, res) => {
  res.send("React_TodoList is here");
});

server.listen(3050, (err) => {
  if (err) throw err;
  console.log(3050 + "번 포트에서 대기 중");
});
