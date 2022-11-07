import React, { useState, useContext } from "react";
import axios from "axios";
import "./transactions.scss";
import { Context } from "../../Context";
import { toast } from "react-toastify";
import Select from "react-select";

function Transactions() {
  const { state } = useContext(Context);
  const { userInfo } = state;
  
  var date = new Date();
  var incomeDateTime = date.toISOString().slice(0, 19);
  var expenseDateTime = date.toISOString().slice(0, 19);

  //INCOME
  const income_userID = userInfo.userID;
  const [incomeModal, setIncomeModal] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState();
  const [incomeCategory, setIncomeCategory] = useState();
  const [incomeDescription, setIncomeDescription] = useState();

  //EXPENSE
  const expense_userID = userInfo.userID;
  const [expenseModal, setExpenseModal] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState();
  const [expenseCategory, setExpenseCategory] = useState();
  const [expenseDescription, setExpenseDescription] = useState();

  const showIncomeModal = async () => {
    setIncomeModal(!incomeModal);
    setExpenseModal(false);
  };

  const showExpenseModal = async () => {
    setExpenseModal(!expenseModal);
    setIncomeModal(false);
  };

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://apifinanceme.com/api/Incomes/add-income", {
        income_userID,
        incomeAmount,
        incomeCategory,
        incomeDescription,
        incomeDateTime,
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setIncomeModal(false);
      console.log("Successful");
      toast.success("Insert Successful");
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://apifinanceme.com/api/Expenses/add-expense", {
        expense_userID,
        expenseAmount,
        expenseCategory,
        expenseDescription,
        expenseDateTime,
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setExpenseModal(false);
      console.log("Successful");
      toast.success("Insert Successful");
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const expenseOptions = [
    { value: "rent", label: "Rent" },
    { value: "gas", label: "Gas" },
    { value: "groceries", label: "Groceries" },
    { value: "other", label: "Other" },
  ];
  const handleChangeExpenseCategory = e => {
    setExpenseCategory(e.value);
  }

  const incomeOptions = [
    { value: "paycheck", label: "Paycheck" },
    { value: "delivery", label: "Delivery" },
    { value: "freelance", label: "Freelance" },
    { value: "other", label: "Other" },
  ];
  const handleChangeIncomeCategory = e => {
    setIncomeCategory(e.value);
  }

  return (
    <div className="transaction">
      <div className="title">Add a new Transaction</div>
      <div className="transaction_type">
        <button onClick={showIncomeModal}>Income</button>
        <button onClick={showExpenseModal}>Expense</button>
      </div>
      {incomeModal && (
        <div className="income_modal">
          <h2>Add Income</h2>
          <form onSubmit={handleIncomeSubmit}>
            <div className="container">
              <div className="form_content">
                <label>
                  <b>Category: </b>
                </label>
                <Select
                  options={incomeOptions}
                  value={incomeOptions.filter(obj => obj.value === incomeCategory)}
                  onChange={handleChangeIncomeCategory}
                />
              </div>
              <div className="form_content">
                <label>
                  <b>Amount: </b>
                </label>
                <input
                  type="text"
                  placeholder="Enter the amount"
                  onChange={(e) => setIncomeAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form_content">
                <label>
                  <b>Description: </b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Description"
                  onChange={(e) => setIncomeDescription(e.target.value)}
                  required
                />
              </div>
              <div className="buttons">
                <button className="submit" type="submit">
                  Submit
                </button>
                <button onClick={showIncomeModal}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}
      {expenseModal && (
        <div className="expense_modal">
          <h2>Add Expense</h2>
          <form onSubmit={handleExpenseSubmit}>
            <div className="container">
              <div className="form_content">
                <label>
                  <b>Category: </b>
                </label>
                <Select
                  options={expenseOptions}
                  value={expenseOptions.filter(obj => obj.value === expenseCategory)}
                  onChange={handleChangeExpenseCategory}
                />
              </div>
              <div className="form_content">
                <label>
                  <b>Amount: </b>
                </label>
                <input
                  type="text"
                  placeholder="Enter the amount"
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form_content">
                <label>
                  <b>Description: </b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Description"
                  onChange={(e) => setExpenseDescription(e.target.value)}
                  required
                />
              </div>
              <div className="buttons">
                <button className="submit" type="submit">
                  Submit
                </button>
                <button onClick={showExpenseModal}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Transactions;
