const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const {
	getAllOperations,
	createOperation,
	deleteOperation,
} = require("../controllers/operation.controller");

const router = Router();

router.get("/", auth, getAllOperations);
router.post("/", auth, createOperation);
router.delete("/:id", auth, deleteOperation);

module.exports = router;
