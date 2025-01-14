const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, upload } = require("../../middelwares");

const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/users");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchemas),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validateBody(schemas.verifyEmail),
  ctrlWrapper(ctrl.resendEmail)
);

router.post(
  "/login",
  validateBody(schemas.loginSchemas),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.subscription),
  ctrlWrapper(ctrl.subscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
