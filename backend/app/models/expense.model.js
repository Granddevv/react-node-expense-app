const mongoose = require("mongoose");
const ExpenseSchema = require("./schemas/expense.schema");

module.exports = mongoose.model("expense", ExpenseSchema);
