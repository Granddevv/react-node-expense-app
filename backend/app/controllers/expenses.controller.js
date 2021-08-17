const _ = require("lodash");
const Controller = require("./abstract.controller");
const mongoose = require("mongoose");

class ExpensesController extends Controller {
  async price(req, res) {
    const result = await this.model.aggregate([
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$amount" },
        },
      },
    ]);
    res.success({ data: result });
  }
}

module.exports = () => new ExpensesController("expense");
