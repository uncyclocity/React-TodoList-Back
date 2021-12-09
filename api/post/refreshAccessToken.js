const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { REFRESH_TOKEN } = req.body;

  const getAccessToken = async () => {
    const res = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      params: {
        grant_type: "refresh_token",
        client_id: process.env.CLIENT_ID,
        refresh_token: REFRESH_TOKEN,
      },
    });
    return {
      ACCESS_TOKEN: res.data.access_token,
    };
  };

  try {
    const { ACCESS_TOKEN } = await getAccessToken();
    res.send({ ACCESS_TOKEN });
  } catch (err) {
    console.error("액세스 토큰을 받아오는 도중 오류가 발생했습니다.");
    res.status(422).send(err);
  }
});

module.exports = router;
