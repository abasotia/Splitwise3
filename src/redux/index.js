import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import transactionReducer from './reducers/transactionReducer'

const reducers = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
})

export default reducers
