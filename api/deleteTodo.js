const connectDB = require("../middleware/mongodb");
const MembersInfo = require("../models/MembersInfo");

const getPlatformDB = async (platform) => {
  const userPlatformDB = await MembersInfo.findOne({
    userPlatform: platform,
  });
  return userPlatformDB;
};

const getTargetMemberIdx = (userPlatformDB, userId) => {
  const targetMemberIdx = userPlatformDB.members.findIndex(
    (member) => member.memberId === userId
  );
  return targetMemberIdx;
};

const deleteTodo = (userPlatformDB, targetMemberIdx, id) => {
  const targetDeletedTodoArr = userPlatformDB.members[
    targetMemberIdx
  ].Todos.filter((todo) => todo.id !== id);
  return targetDeletedTodoArr;
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { userId, userPlatform, id } = req.body;
    if (userId && userPlatform && id) {
      try {
        let userPlatformDB = getPlatformDB(userPlatform);
        const targetMemberIdx = getTargetMemberIdx(userPlatformDB, userId);
        userPlatformDB.members[targetMemberIdx].Todos = deleteTodo(
          userPlatformDB,
          targetMemberIdx,
          id
        );
        const usercreated = await userPlatformDB.save();
        return res.status(200).send(usercreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

module.exports = connectDB(handler);
