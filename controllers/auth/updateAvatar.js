const fs = require("fs").promises;
const { model } = require("mongoose");
const path = require("path");

const { User } = require("../../models/users");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalName } = req.file;

  const extentions = originalName.split(".").pop;
  const fileName = `${_id}.${extentions}`;

  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
