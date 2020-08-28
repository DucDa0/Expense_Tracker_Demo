export default (state, action) => {
  switch (action.type) {
    case 'GET_TRANS':
      return {
        ...state,
        transactions: action.payload,
      };
    case 'DELETE_TRANS':
      return {
        ...state,
        transactions: state.transactions.filter(
          (item) => item.id !== action.payload
        ),
      };
    case 'ADD_TRANS':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'CLEAR_TRANS':
      return {
        ...state,
        transactions: [],
      };
    default:
      return state;
  }
};
