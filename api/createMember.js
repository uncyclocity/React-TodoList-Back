const connectDB = require("../middleware/mongodb");
const {
  getPlatformDB,
  createNewPlatform,
  getIsExistMember,
  createNewMember,
} = require("./apifunc");

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
          return res.status(200).send("data existed");
        } else {
          await createNewMember(id, nickname, userPlatformDB);
          const usercreated = await userPlatformDB.save();
          return res.status(200).send(usercreated);
        }
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
