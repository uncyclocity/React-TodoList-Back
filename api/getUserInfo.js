const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { ACCESS_TOKEN } = req.body;

  const getUserInfo = async (ACCESS_TOKEN) => {
    const res = await axios({
      method: "POST",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return res.data;
  };

  try {
    const { id, properties } = await getUserInfo(ACCESS_TOKEN);
    res.send({ id, nickname: properties["nickname"], platform: "kakao" });
  } catch (err) {
    console.error("사용자 정보를 받아오는 도중 오류가 발생했습니다.");
    res.status(422).send(err);
  }
});

module.exports = router;
