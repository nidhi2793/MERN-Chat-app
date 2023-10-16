const jwt = require("jsonwebtoken");

const generteToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = generteToken;
