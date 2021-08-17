const router = require("express").Router();
const resSuccess = require("../middleware/res-success");
const resError = require("../middleware/res-error");
const expenseController = require("../controllers/expenses.controller")();

router.use(resError);
router.use(resSuccess);

router.get("/", (req, res) => res.status(200).send("Expense API."));
//expense
router.get("/expense", expenseController.listAll.bind(expenseController));
router.get("/expense/sum",expenseController.price.bind(expenseController));
router.get("/expense/:id", expenseController.show.bind(expenseController));
router.post("/expense", expenseController.create.bind(expenseController));
router.put("/expense/:id", expenseController.update.bind(expenseController));
router.delete(
  "/expense/:id",
  expenseController.destroy.bind(expenseController)
);

module.exports = router;
