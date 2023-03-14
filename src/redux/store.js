import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
import reducers from './index'
// import authReducer from './reducers/authReducer'
// import transactionReducer from './reducers/transactionReducer'

const store = createStore(
  // authReducer,
  // transactionReducer,
  reducers,
  // applyMiddleware(thunk)
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

console.log(store)

export default store
