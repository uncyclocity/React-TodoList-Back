const connectDB = require("../middleware/mongodb");
const {
  getPlatformDB,
  getTargetMemberIdx,
  getTargetMemberTodosArr,
} = require("./apifunc");

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
