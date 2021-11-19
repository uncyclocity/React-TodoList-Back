const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const membersInfo = new Schema({
  _id: Schema.Types.ObjectId,

  userPlatform: String,

  members: [
    {
      memberId: String,

      nickname: String,

      Todos: [
        {
          id: String,

          text: String,

          isDone: Boolean,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("MembersInfo", membersInfo);
