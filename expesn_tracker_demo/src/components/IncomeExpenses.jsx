import React,{useContext} from "react";
import {GlobalContext} from '../context/GlobalState';
export const IncomeExpenses = () => {
  const {transactions,format}=useContext(GlobalContext);
  const amounts=transactions.map(tran=>tran.amount);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  );
  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p id="money-plus" className="money plus">
            +${format(Math.abs(income))}
        </p>
      </div>
      <div>
        <h4>Expense</h4>
        <p id="money-minus" className="money minus">
            -${format(Math.abs(expense))}
        </p>
      </div>
    </div>
  );
};
