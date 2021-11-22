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

const getTargetMemberTodosArr = (userPlatformDB, targetMemberIdx) => {
  const targetMemberTodosArr = userPlatformDB.members[targetMemberIdx].Todos;
  return targetMemberTodosArr;
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { userId, userPlatform } = req.body;
    if (userId && userPlatform) {
      try {
        let userPlatformDB = await getPlatformDB(userPlatform);
        const targetMemberIdx = getTargetMemberIdx(userPlatformDB, userId);
        const targetMemberTodosArr = getTargetMemberTodosArr(
          userPlatformDB,
          targetMemberIdx
        );
        return res.status(200).send(targetMemberTodosArr);
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
