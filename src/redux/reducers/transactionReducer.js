// import { TransactionActionTypes } from '../constants/transactionActionTypes'

// const initialTransactionState =
//   JSON.parse(localStorage.getItem('transactionDetails')) || []

// const transactionReducer = (state = initialTransactionState, action) => {
//   const newState = state.slice()
//   switch (action.type) {
//     case TransactionActionTypes.ADD_EXPENSE:
//       addexpense(newState, action)
//       return newState
//     case TransactionActionTypes.SET_DATA:
//       return { ...state, data: action.payload }
//     case TransactionActionTypes.SET_USERS:
//       return { ...state, users: action.payload }
//     case TransactionActionTypes.SET_INPUT_VALUE:
//       return { ...state, inputValue: action.payload }
//     case TransactionActionTypes.SET_DESCRIPTION:
//       return { ...state, description: action.payload }
//     case TransactionActionTypes.SET_SELECTED_USER:
//       return { ...state, selectedUser: action.payload }
//     case TransactionActionTypes.SET_SELECTED_PAYEE:
//       return { ...state, selectedPayee: action.payload }
//     case TransactionActionTypes.DELETE_EXPENSE:
//       // const updatedData = state.data.filter((expense) => expense.id !== action.payload)
//       // localStorage.setItem('expensesData', JSON.stringify(updatedData))
//       // return { ...state, data: updatedData }
//       return { ...state, data: action.payload }

//     default:
//       return newState
//   }
// }

// const addexpense = (state, action) => {
//   state.push(action.payload)
//   localStorage.setItem('transactionDetails', JSON.stringify(state))
// }

// const deleteexpense = (state,action) => {

// }

// export default transactionReducer

import { TransactionActionTypes } from '../constants/transactionActionTypes'

const initialState = {
  transaction: JSON.parse(localStorage.getItem('expensesData')) || [],
}

export const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TransactionActionTypes.ADD_EXPENSE:
      return {
        transaction: [...state.transaction, action.payload],
      }

    case TransactionActionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
      }
    case TransactionActionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      }
    default:
      return state
  }
}

export default transactionReducer
