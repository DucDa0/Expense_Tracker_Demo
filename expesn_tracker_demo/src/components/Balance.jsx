import React,{useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';

export const Balance = () => {
    const {transactions,format}=useContext(GlobalContext);
    const amounts=transactions.map(tran=>tran.amount);
    const total=amounts.reduce((acc,item)=>acc+=item,0);
    const sign=total>=0?'':'-';
    return (
        <div>
            <h4>Your Balance</h4>
            <h1 id="balance">{sign}${format(Math.abs(total))}</h1>
        </div>
    )
}
