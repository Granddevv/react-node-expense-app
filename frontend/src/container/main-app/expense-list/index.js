import moment from "moment";
import React, { useEffect, useState } from "react";
import { ExpenseModal } from "../../../components";
import { EXPENSE_EDIT } from "../../../assets/consts";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_EXPENSE, SET_EXPENSE } from "../../../store/actions/expense";
import { deleteAPI, get } from "../../../utils/axios";
import { EXPENSE_TAXES } from "../../../assets/consts";
import "./style.css";

export default function ExpenseList(props) {
  const expenseList = useSelector((state) => state.expense.data);
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [expenseData, setExpenseData] = useState(null);

  useEffect(() => {
    handleFetchExpense();
  }, []);

  async function handleFetchExpense() {
    try {
      const result = await get("/expense");

      if (result?.data?.success) {
        dispatch({
          type: SET_EXPENSE,
          payload: result.data.data,
        });
      }
    } catch (error) {
      console.log("error ---", error);
    }
  }

  function handleEdit(item) {
    console.log("handle edit", item);
    setEditModal(true);
    setExpenseData(item);
  }

  async function handleDel(item) {
    console.log("handle delete", item);
    try {
      const result = await deleteAPI(`/expense/${item._id}`);
      console.log("result -- ", result);
      if (result?.data?.success) {
        dispatch({
          type: DELETE_EXPENSE,
          payload: {
            id: item._id,
          },
        });
      }
    } catch (error) {}
  }

  return (
    <div className="list-container">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Taxes(15%)</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenseList.map((item) => (
            <tr key={item._id}>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>{(item.amount * EXPENSE_TAXES).toFixed(2)}</td>
              <td>{moment(item.created).format("YYYY-MM-DD HH:mm")}</td>
              <td className="action-container">
                <button className="btn-edit" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDel(item)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editModal && (
        <ExpenseModal
          type={EXPENSE_EDIT}
          data={expenseData}
          handleClose={() => setEditModal(false)}
        />
      )}
    </div>
  );
}
