import React, { useEffect, useState } from "react";
import ExpenseModal from "../../../components/expense-modal";
import { EXPENSE_NEW } from "../../../assets/consts";
import { get } from "../../../utils/axios";
import { useSelector } from "react-redux";
import { EXPENSE_TAXES } from "../../../assets/consts";
import "./style.css";

export default function Header(props) {
  const expenseList = useSelector((state) => state.expense.data);
  const [newModal, setNewModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    handleFetchTotalPrice();
  }, [expenseList]);

  function handleNew() {
    setNewModal(true);
  }

  async function handleFetchTotalPrice() {
    try {
      const result = await get("/expense/sum");
      if (result?.data?.success) {
        if (result?.data?.data[0]?.totalPrice > 0) {
          setTotalPrice(result.data.data[0].totalPrice);
        } else {
          setTotalPrice(0);
        }
      }
    } catch (error) {}
  }

  return (
    <div className="header-container">
      <h1>Expense Tracker</h1>
      <div className="header-wrapper">
        <div>
          <h4>
            The sub-total of expense is {totalPrice * (1 - EXPENSE_TAXES)}$
          </h4>
          <h4>The total with taxes is {totalPrice}$</h4>
        </div>
        <button className="btn-new" onClick={handleNew}>
          Add new expense
        </button>
      </div>
      {newModal && (
        <ExpenseModal
          type={EXPENSE_NEW}
          data={null}
          handleClose={() => setNewModal(false)}
        />
      )}
    </div>
  );
}
