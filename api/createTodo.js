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
    (member) => member.memberId === userId.toString()
  );
  return targetMemberIdx;
};

const createNewTodo = (id, text, isDone, targetMemberIdx, userPlatformDB) => {
  const todoObj = {
    id,
    text,
    isDone,
  };
  userPlatformDB.members[targetMemberIdx].Todos.push(todoObj);
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { userId, userPlatform, id, text, isDone } = req.body;
    if (userId && userPlatform && id >= 0 && text) {
      try {
        let userPlatformDB = await getPlatformDB(userPlatform);
        const targetMemberIdx = getTargetMemberIdx(userPlatformDB, userId);
        createNewTodo(id, text, isDone, targetMemberIdx, userPlatformDB);
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
