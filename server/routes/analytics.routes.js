const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const { getSavingsData } = require("../controllers/savings.controller");
const { getIncomesData } = require("../controllers/incomes.controller");
const { getExpensesData } = require("../controllers/expenses.controller");
const {
	getExpensesByCategory,
} = require("../controllers/exp-by-category.controller");
const { getGrowthData } = require("../controllers/growth.controller");

const router = Router();

router.get("/savings", auth, getSavingsData);
router.get("/incomes", auth, getIncomesData);
router.get("/expenses", auth, getExpensesData);
router.get("/expenses-by-category", auth, getExpensesByCategory);
router.get("/growth", auth, getGrowthData);

module.exports = router;
