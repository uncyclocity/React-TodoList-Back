const connectDB = require("../../middleware/mongodb");
const { getPlatformDB, getTargetMemberIdx, deleteTodo } = require("../apifunc");

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { userId, userPlatform, id } = req.body;
    if (userId && userPlatform && id >= 0) {
      try {
        let userPlatformDB = await getPlatformDB(userPlatform);
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
