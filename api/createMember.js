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
        await createNewMember(id, nickname, userPlatformDB);
        const usercreated = await userPlatformDB.save();
        return res.status(200).send(usercreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      console.log(req.body);
      res.status(422).send("data_incomplete");
    }
  } else {
    console.log("ㅂㅇ");
    res.status(422).send("req_method_not_supported");
  }
};

module.exports = connectDB(handler);
