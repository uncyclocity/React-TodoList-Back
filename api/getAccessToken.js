const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const { code } = req.query;
  const redirectUri = "http://localhost:3000/logining";

  const getAccessToken = async (code) => {
    const res = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      params: {
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        redirect_uri: redirectUri,
        code,
      },
    }).catch((err) => {
      console.error("액세스 토큰을 받아오는 도중 오류가 발생했습니다.");
      console.error(err);
    });

    return res.data.access_token;
  };

  const getUserInfo = async (ACCESS_TOKEN) => {
    const res = await axios({
      method: "POST",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }).catch((err) => {
      console.error("사용자 정보를 받아오는 도중 오류가 발생했습니다.");
      console.error(err);
    });
    return res.data;
  };

  const ACCESS_TOKEN = await getAccessToken(code);
  const { id, properties } = await getUserInfo(ACCESS_TOKEN);

  res.send({ id, nickname: properties["nickname"] });
});

module.exports = router;
