import React from "react";
import Header from "./header";
import ExpenseList from "./expense-list";
import "./style.css";

export default function MainApp(props) {
  return (
    <div className="app-container">
      <Header />
      <ExpenseList />
    </div>
  );
}
