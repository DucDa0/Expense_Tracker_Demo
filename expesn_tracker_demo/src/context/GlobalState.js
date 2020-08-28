import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
//* initial state
const initialState = {
  transactions: [],
};

//*creat context
export const GlobalContext = createContext(initialState);

//* provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const data = JSON.parse(localStorage.getItem('transList')) || [];
  //*action

  const getTransaction = () => {
    dispatch({
      type: 'GET_TRANS',
      payload: data,
    });
  };

  const delTransaction = (id) => {
    const index = data.indexOf(data[id]);
    data.splice(index, 1);
    localStorage.setItem('transList', JSON.stringify(data));
    dispatch({
      type: 'DELETE_TRANS',
      payload: id,
    });
  };
  const addTransaction = (tran) => {
    data.push(tran);
    localStorage.setItem('transList', JSON.stringify(data));
    dispatch({
      type: 'ADD_TRANS',
      payload: tran,
    });
  };
  const clearTransaction = () => {
    localStorage.removeItem('transList');
    dispatch({
      type: 'CLEAR_TRANS',
    });
  };
  const nFormatter = (num, digits = 2) => {
    var si = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
  };
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        delTransaction,
        addTransaction,
        clearTransaction,
        getTransaction,
        format: nFormatter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
