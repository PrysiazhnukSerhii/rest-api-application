const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { v4: uuid } = require("uuid");
// не забуть потом перемістити зжимання картинки при оновлені чуть вище і перевірити чи працює ця функція ( ментор казав щоб підняти вище функцію зжимання картинки в котроллері змінни аватарки)

// мені не нравится як він генерую кот з дефісами

const { User } = require("../../models/users");

const { RequestError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res, nex) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuid();
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify your email </a>`,
  };

  await sendEmail(mail);

  res
    .status(201)
    .json({ email: result.email, subscription: result.subscription });
};

module.exports = register;
