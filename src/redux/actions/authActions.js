import { AuthActionTypes } from '../constants/authActionTypes'

export const login = (user) => {
  return {
    type: AuthActionTypes.LOGIN,
    payload: {
      user,
    },
  }
}
// export const loginFailure = (error) => {
//   return {
//     type: AuthActionTypes.LOGIN_FAILURE,
//     payload: error,
//   }
// }

export const logout = () => {
  return {
    type: AuthActionTypes.LOGOUT,
  }
}

export const signup = (name, dob, email, password) => {
  return {
    type: AuthActionTypes.SIGN_UP,
    payload: {
      name,
      dob,
      email,
      password,
    },
  }
}

// import { AuthActionTypes } from '../constants/authActionTypes'

// export const loginSuccess = (user) => {
//   return {
//     type: AuthActionTypes.LOGIN_SUCCESS,
//     payload: user,
//   }
// }

// export const loginFailure = (error) => {
//   return {
//     type: AuthActionTypes.LOGIN_FAILURE,
//     payload: error,
//   }
// }

// export const signup = (user) => {
//   return {
//     type: AuthActionTypes.SIGN_UP,
//     payload: user,
//   }
// }

// export const logout = () => {
//   return {
//     type: AuthActionTypes.LOGOUT,
//   }
// }
