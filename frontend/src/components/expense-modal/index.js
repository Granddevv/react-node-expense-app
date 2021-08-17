import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { EXPENSE_NEW } from "../../assets/consts";
import { ADD_EXPENSE, UPDATE_EXPENSE } from "../../store/actions/expense";
import { post, put } from "../../utils/axios";
import "./style.css";

export default function ExpenseModal(props) {
  const dispatch = useDispatch();
  const { data, type } = props;
  const [formVal, setFormVal] = useState({
    amount: type === EXPENSE_NEW ? "" : data.amount,
    description: type === EXPENSE_NEW ? "" : data.description,
  });

  function handleModalClose() {
    const { handleClose } = props;
    handleClose();
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (type === EXPENSE_NEW) {
      try {
        const result = await post("/expense", formVal);
        console.log("create expense result", result);
        if (result?.data?.success) {
          console.log("add expense dispatch", result.data.data);
          dispatch({
            type: ADD_EXPENSE,
            payload: result.data.data,
          });

          handleModalClose();
        }
      } catch (error) {}
    } else {
      try {
        const result = await put(`/expense/${data._id}`, formVal);
        console.log("create expense result", result);
        if (result?.data?.success) {
          console.log("add expense dispatch", result.data.data);
          dispatch({
            type: UPDATE_EXPENSE,
            payload: {
              id: data._id,
              data: result.data.data,
            },
          });

          handleModalClose();
        }
      } catch (error) {}
    }
  }

  function handleChange(evt) {
    setFormVal({
      ...formVal,
      [evt.target.name]: evt.target.value,
    });
  }

  return (
    <Modal open={true} onClose={handleModalClose} center>
      <div className="modal-container">
        <h3>{type === EXPENSE_NEW ? "New Expense" : "Edit Expense"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="line-input">
            <label>Amount</label>
            <input
              name="amount"
              value={formVal.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="line-input">
            <label>Description</label>
            <input
              name="description"
              value={formVal.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="footer-container">
            <button type="submit" className="btn-create">
              {type === EXPENSE_NEW ? "Create" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

ExpenseModal.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
};
