let authToken = "";

function setToken(token) {
  authToken = token;
}

async function Log(
  stack,
  level,
  packageName,
  message
) {
  try {
    await fetch(
      "http://4.224.186.213/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          stack,
          level,
          package: packageName,
          message,
        }),
      }
    );
  } catch (error) {
    console.log("Log failed");
  }
}

module.exports = {
  Log,
  setToken,
};