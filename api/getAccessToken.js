const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const { code } = req.query;
  const redirectUri = "https://react-todo-list-lyart-tau.vercel.app/";

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
      res.status(422).send(err);
    });

    return {
      ACCESS_TOKEN: res.data.access_token,
      REFRESH_TOKEN: res.data.refresh_token,
    };
  };

  const { ACCESS_TOKEN, REFRESH_TOKEN } = await getAccessToken(code);

  res.send({ ACCESS_TOKEN, REFRESH_TOKEN });
});

module.exports = router;
