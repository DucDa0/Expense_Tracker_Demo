import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
//* initial state
const initialState={
    transactions: []
}

//*creat context
export const GlobalContext=createContext(initialState);

//* provider component
export const GlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(AppReducer, initialState);
    const data=JSON.parse(localStorage.getItem('transList')) || [];
    //*action

    const getTransaction=()=>{
        dispatch({
            type:'GET_TRANS',
            payload: data
        })
    }

    const delTransaction=(id)=>{
        const index=data.indexOf(data[id]);
        data.splice(index,1);
        localStorage.setItem('transList', JSON.stringify(data));
        dispatch({
            type:'DELETE_TRANS',
            payload: id
        })
    }
    const addTransaction=(tran)=>{
        data.push(tran);
        localStorage.setItem('transList', JSON.stringify(data));
        dispatch({
            type:'ADD_TRANS',
            payload: tran
        })
    }
    const clearTransaction=()=>{
        localStorage.removeItem('transList');
        dispatch({
            type:'CLEAR_TRANS'
        })
    }
    
    const format=(n)=> {
        return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            delTransaction,
            addTransaction,
            clearTransaction,
            getTransaction,
            format
        }}>
            {children}
        </GlobalContext.Provider>
    )
}