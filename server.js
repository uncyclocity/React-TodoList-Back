const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config();

server.use(express.json());

server.use(cors());

const getAccessToken = require("./api/getAccessToken");
const getUserInfo = require("./api/getUserInfo");
const createMember = require("./api/createMember");
const createTodo = require("./api/createTodo");
const changeTodoStatus = require("./api/changeTodoStatus");
const deleteTodo = require("./api/deleteTodo");
const getTodos = require("./api/getTodos");
const refreshAccessToken = require("./api/refreshAccessToken");

server.use("/api/getAccessToken", getAccessToken);
server.use("/api/getUserInfo", getUserInfo);
server.use("/api/createMember", createMember);
server.use("/api/createTodo", createTodo);
server.use("/api/changeTodoStatus", changeTodoStatus);
server.use("/api/deleteTodo", deleteTodo);
server.use("/api/getTodos", getTodos);
server.use("/api/refreshAccessToken", refreshAccessToken);

server.get("/", (req, res) => {
  res.send("React_TodoList is here");
});

server.listen(3050, (err) => {
  if (err) throw err;
  console.log(3050 + "번 포트에서 대기 중");
});
