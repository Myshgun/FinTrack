const express = require("express");

const router = express.Router({ mergeParams: true });

// пользовательские роуты

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/accounts", require("./accounts.routes"));
router.use("/operations", require("./operations.routes"));

// админские роуты

router.use("/manage/type", require("./admin/type.routes"));
router.use("/manage/category", require("./admin/category.routes"));
router.use("/manage/users", require("./admin/users.routes"));

module.exports = router;
