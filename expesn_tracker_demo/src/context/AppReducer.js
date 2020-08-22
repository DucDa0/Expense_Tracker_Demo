export default (state, {type,payload})=>{
    switch(type){
        case 'GET_TRANS':
            return{
                ...state,
                transactions: payload
            }
        case 'DELETE_TRANS':
            return{
                ...state,
                transactions: state.transactions.filter(item=>item.id!==payload)
            }
        case 'ADD_TRANS':
            return{
                ...state,
                transactions: [...state.transactions,payload]
            }
        case 'CLEAR_TRANS':

            return{
                ...state,
                transactions:[]
            }
        default:
            return state;
    }
}

