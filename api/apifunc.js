const MembersInfo = require("../models/MembersInfo");
const mongoose = require("mongoose");

const getPlatformDB = async (platform) => {
  const userPlatformDB = await MembersInfo.findOne({
    userPlatform: platform,
  });
  console.log("getPlatformDB");
  return userPlatformDB;
};

const getTargetMemberIdx = (userPlatformDB, userId) => {
  const targetMemberIdx = userPlatformDB.members.findIndex(
    (member) => member.memberId === userId.toString()
  );
  return targetMemberIdx;
};

const getTargetTodoIdx = (userPlatformDB, targetMemberIdx, id) => {
  const targetTodoIdx = userPlatformDB.members[targetMemberIdx].Todos.findIndex(
    (todo) => todo.id === id.toString()
  );
  return targetTodoIdx;
};

const changeTodoStatus = (
  isDone,
  targetMemberIdx,
  targetTodoIdx,
  userPlatformDB
) => {
  userPlatformDB.members[targetMemberIdx].Todos[targetTodoIdx].isDone = isDone;
};

const createNewPlatform = async (platform) => {
  var newPlatform = {
    _id: new mongoose.Types.ObjectId(),
    userPlatform: platform,
    members: [],
  };
  return new MembersInfo(newPlatform);
};

const getIsExistMember = (userPlatformDB, id) => {
  const targetMemberIdx = userPlatformDB.members.findIndex(
    (member) => member.memberId === id.toString()
  );
  return targetMemberIdx >= 0;
};

const createNewMember = async (memberId, nickname, userPlatformDB) => {
  const userObj = {
    memberId,
    nickname,
    Todos: [],
  };
  userPlatformDB.members.push(userObj);
};

const createNewTodo = (id, text, isDone, targetMemberIdx, userPlatformDB) => {
  const todoObj = {
    id,
    text,
    isDone,
  };
  userPlatformDB.members[targetMemberIdx].Todos.push(todoObj);
};

const deleteTodo = (userPlatformDB, targetMemberIdx, id) => {
  const targetDeletedTodoArr = userPlatformDB.members[
    targetMemberIdx
  ].Todos.filter((todo) => todo.id !== id.toString());
  return targetDeletedTodoArr;
};

const getTargetMemberTodosArr = (userPlatformDB, targetMemberIdx) => {
  const targetMemberTodosArr = userPlatformDB.members[targetMemberIdx].Todos;
  return targetMemberTodosArr;
};

module.exports = {
  getPlatformDB,
  getTargetMemberTodosArr,
  getTargetTodoIdx,
  getTargetMemberIdx,
  changeTodoStatus,
  createNewMember,
  createNewPlatform,
  createNewTodo,
  deleteTodo,
  getIsExistMember,
};
