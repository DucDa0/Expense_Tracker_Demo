import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import shortId from 'shortid';
export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const { addTransaction } = useContext(GlobalContext);
  const inputElement = React.useRef(null);
  const handleOnChangeAmountInput = (e) => {
    setAmount(e.target.value);
  };
  const handleOnChangeTextInput = (e) => {
    setText(e.target.value);
  };
  const handleOnsubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) {
      return;
    }
    const newTran = {
      id: shortId.generate(),
      text,
      amount: parseInt(amount),
    };
    inputElement.current.focus();
    addTransaction(newTran);
    setText('');
    setAmount(0);
  };
  return (
    <div>
      <h3
        style={{
          borderBottom: '1px solid #bbb',
          marginBottom: 0,
          paddingBottom: '15px',
        }}
      >
        Add new transaction
      </h3>
      <form onSubmit={handleOnsubmit}>
        <div className='form-control'>
          <label htmlFor='text'>Text</label>
          <input
            ref={inputElement}
            type='text'
            id='text'
            value={text}
            onChange={handleOnChangeTextInput}
            placeholder='Enter text...'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type='number'
            id='amount'
            value={amount}
            onChange={handleOnChangeAmountInput}
            placeholder='Enter amount...'
          />
        </div>
        <button className='btn'>Add transaction</button>
      </form>
    </div>
  );
};
