import { AuthActionTypes } from '../constants/authActionTypes'

const initialState = {
  isLoggedIn: false,
  allUsers: JSON.parse(localStorage.getItem('usersw')) || [],
  user: localStorage.getItem('loggedUser') || null,
  // allUsers: [],
  // user: null,
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('HELOOO', action.payload)
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      }
    // case 'LOGIN_FAILURE':
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //     user: null,
    //     error: action.payload,
    //   }
    case 'SIGN_UP':
      return {
        ...state,
        isLoggedIn: false,
        allUsers: [...state.allUsers, action.payload],
        user: null,
        error: null,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
      }
    default:
      return state
  }
}

// const initialState = {
//   loggedUser: JSON.parse(localStorage.getItem('loggedUser')),
//   alluser: JSON.parse(localStorage.getItem('updatedUsers')),
// }

// const authReducer = (state = initialState, action) => {
//   const newState = Object.assign({}, state)
//   switch (action.type) {
//     case AuthActionTypes.LOGIN:
//       onLogin(newState, action)
//       return newState
//     case AuthActionTypes.LOGOUT:
//       onLogout(newState, action)
//       return newState
//     case AuthActionTypes.SIGN_UP:
//       onSingup(newState, action)
//       return newState
//     default:
//       return newState
//   }
// }

// const onLogin = (newState, action) => {
//   const { email, password } = action.payload

//   const registeredUsers = JSON.parse(localStorage.getItem('updatedUsers'))
//   const registeredUser = registeredUsers.find((x) => {
//     return x.email === email && x.password === password
//   })

//   if (registeredUser) {
//     newState.loggedUser = registeredUser
//     localStorage.setItem('loggedUser', JSON.stringify(newState.loggedUser))
//   }
// }

// const onLogout = (state, action) => {
//   state.loggedUser = null
//   localStorage.setItem('loggedUser', null)
// }

// const onSingup = (state, action) => {
//   const user = action.payload
//   const registeredUsers = JSON.parse(localStorage.getItem('updatedUsers')) || []
//   registeredUsers.push(user)

//   localStorage.setItem('updatedUsers', JSON.stringify(registeredUsers))
//   state.alluser = registeredUsers
// }
export default authReducer
