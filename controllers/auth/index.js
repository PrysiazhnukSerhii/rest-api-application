const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const subscription = require("./subscription");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify")
const resendEmail = require('./resendEmail')

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  subscription,
  updateAvatar,
  verify,
  resendEmail
};
