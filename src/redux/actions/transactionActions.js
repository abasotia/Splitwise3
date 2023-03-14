import { TransactionActionTypes } from '../constants/transactionActionTypes'

export const addExpense = (
  description,
  id,
  split_value,
  PaidFor,
  Payee,
  total
) => {
  return {
    type: TransactionActionTypes.ADD_EXPENSE,
    payload: {
      description,
      id,
      split_value,
      PaidFor,
      Payee,
      total,
    },
  }
}

export const setData = (data) => ({
  type: TransactionActionTypes.SET_DATA,
  payload: data,
})

export const setUsers = (users) => ({
  type: TransactionActionTypes.SET_USERS,
  payload: users,
})

export const fetchData = () => {
  return async (dispatch) => {
    try {
      const storedData = JSON.parse(localStorage.getItem('expensesData'))
      const response = await fetch('storedData')
      const data = await response.json()
      dispatch(setData(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// action always returns an object which has key as Type and a payload
