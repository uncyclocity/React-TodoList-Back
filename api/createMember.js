const connectDB = require("../middleware/mongodb");
const MembersInfo = require("../models/MembersInfo");
const mongoose = require("mongoose");

const getPlatformDB = async (platform) => {
  const userPlatformDB = await MembersInfo.findOne({
    userPlatform: platform,
  });
  return userPlatformDB;
};

const createNewPlatform = async (platform) => {
  var newPlatform = {
    _id: new mongoose.Types.ObjectId(),
    userPlatform: platform,
    members: [],
  };
  console.log(newPlatform);
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

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id, nickname, platform } = req.body;
    if (id && nickname && platform) {
      try {
        let userPlatformDB = await getPlatformDB(platform);
        if (userPlatformDB === null) {
          userPlatformDB = await createNewPlatform(platform);
        }
        if (getIsExistMember(userPlatformDB, id)) {
          // DB에 존재하는 사용자의 경우 새로 만들지 않음
          return res.status(200);
        } else {
          await createNewMember(id, nickname, userPlatformDB);
          const usercreated = await userPlatformDB.save();
          return res.status(200).send(usercreated);
        }
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      console.log(req.body);
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

module.exports = connectDB(handler);
