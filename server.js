const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config();

server.use(express.json());

server.use(cors());

// get
const getAccessToken = require("./api/get/getAccessToken");
const getUserInfo = require("./api/get/getUserInfo");
const getTodos = require("./api/get/getTodos");

// post
const createMember = require("./api/post/createMember");
const createTodo = require("./api/post/createTodo");
const refreshAccessToken = require("./api/post/refreshAccessToken");

// put
const changeTodoStatus = require("./api/put/changeTodoStatus");

// delete
const deleteTodo = require("./api/delete/deleteTodo");


// get
server.use("/get/accesstoken", getAccessToken);
server.use("/get/userinfo", getUserInfo);
server.use("/get/todos", getTodos);

// post
server.use("/post/member", createMember);
server.use("/post/todo", createTodo);
server.use("/post/accesstoken", refreshAccessToken);

// put
server.use("/put/todostatus", changeTodoStatus);

// delete
server.use("/delete/todo", deleteTodo);

server.get("/", (req, res) => {
  res.send("React TodoList is here");
});

server.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(process.env.PORT + "번 포트에서 대기 중");
});
