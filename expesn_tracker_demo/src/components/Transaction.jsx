import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({ tran }) => {
  const { delTransaction, format } = useContext(GlobalContext);
  const sign = tran.amount < 0 ? '-' : '+';
  return (
    <li
      onClick={() => delTransaction(tran.id)}
      className={tran.amount > 0 ? 'plus' : 'minus'}
    >
      <span className='text'>{tran.text}</span>{' '}
      <span>
        {sign}${format(Math.abs(tran.amount))}
      </span>
    </li>
  );
};
