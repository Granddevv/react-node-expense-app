const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema(
  {
    amount: Number,
    description: String,
  },
  {
    timestamps: {
      createdAt: "created",
    },
  }
);

module.exports = ExpenseSchema;
