import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from './Transaction';

export const TransactionList = () => {
  const { transactions, clearTransaction, getTransaction } = useContext(
    GlobalContext
  );
  const [value, setValue] = useState('all');
  const filterData =
    value === 'income'
      ? transactions.filter((item) => item.amount >= 0)
      : value === 'expense'
      ? transactions.filter((item) => item.amount < 0)
      : transactions;
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    getTransaction();
  }, []);
  return (
    <div>
      <div className='history'>
        <h3>History</h3>
        <div className='action'>
          <select value={value} onChange={handleChange} className='select'>
            <option value='all'>All</option>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
          </select>
          <button onClick={clearTransaction} className='clear'>
            X
          </button>
        </div>
      </div>
      <ul id='list' className='list'>
        {filterData.map((tran) => (
          <Transaction key={tran.id} tran={tran} />
        ))}
      </ul>
    </div>
  );
};
