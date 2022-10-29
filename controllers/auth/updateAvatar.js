const fs = require("fs").promises;

const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/users");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const extentions = originalname.split(".").pop();

  const fileName = `${_id}.${extentions}`;

  const resultUpload = path.join(avatarDir, fileName);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  await Jimp.read(resultUpload)
    .then((image) => {
      return image.resize(250, 250).writeAsync(resultUpload);
    })
    .catch((err) => {
      console.error(err);
    });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
