const express = require("express");
const server = express();
const cors = require("cors");

server.use(cors());

server.get("/", (req, res) => {
  res.send("React_TodoList is here");
});

server.listen(3050, (err) => {
  if (err) throw err;
  console.log(3050 + "번 포트에서 대기 중");
});
