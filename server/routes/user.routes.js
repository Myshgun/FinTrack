const { Router } = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = Router();

/* Получить данные пользователя */

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    const { password, ...userObj } = user.toObject();

    res.status(201).json(userObj);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
