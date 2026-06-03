require("dotenv").config();





require("dotenv").config();

async function getAccessToken() {
  const response = await fetch(
    "http://4.224.186.213/evaluation-service/auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.EMAIL,
        name: process.env.NAME,
        rollNo: process.env.ROLL_NO,
        accessCode: process.env.ACCESS_CODE,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate access token");
  }

  const data = await response.json();

  return data.access_token;
}

module.exports = {
  getAccessToken,
};