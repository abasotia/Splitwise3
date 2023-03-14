import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { connect, useDispatch, useSelector } from 'react-redux'
import { login } from '../../../redux/actions/authActions'
import authReducer from '../../../redux/reducers/authReducer'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const existingUsers = useSelector((state) => state.auth.allUsers)
  const [inpval, setInpval] = useState({
    email: '',
    password: '',
  })

  const [data, setData] = useState([])
  console.log(inpval)

  const getdata = (e) => {
    const { value, name } = e.target

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      }
    })
  }

  const addData = (e) => {
    e.preventDefault()
    const { email, password } = inpval

    const getuserArr = existingUsers
    // console.log(getuserArr)

    if (email === '') {
      alert('email field is requred')
    } else if (!email.includes('@')) {
      alert('plz enter valid email addres')
    } else if (password === '') {
      alert('password field is requred')
    } else if (password.length < 5) {
      alert('password length greater five')
    } else {
      if (getuserArr && getuserArr.length) {
        const userdata = getuserArr
        console.log(userdata)
        const userlogin = userdata.filter((ele, ind) => {
          console.log('ele', ele, ele.email, email, ele.password, password)
          return ele.email === email && ele.password === password
        })

        if (userlogin.length === 0) {
          alert('Invalid details')
        } else {
          console.log('User login succesfull')
          console.log("Userlogin", userlogin[0]['name'])
          localStorage.setItem('loggedUser', userlogin[0]['name'])

          dispatch(login(userlogin[0]['name']))
          navigate('/split')
        }
      } else {
        alert(
          'You are not registered. Please click on Signup button to register'
        )
      }
    }
  }

  return (
    <>
      <Form>
        <Form.Group className='mb-3 col-lg-6' controlId='formBasicEmail'>
          <Form.Control
            type='email'
            name='email'
            onChange={getdata}
            placeholder='Enter your email'
          />
        </Form.Group>

        <Form.Group className='mb-3 col-lg-6' controlId='formBasicPassword'>
          <Form.Control
            type='password'
            name='password'
            onChange={getdata}
            placeholder='Password'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'></Form.Group>
        <Button
          variant='primary'
          className='col-lg-6'
          onClick={addData}
          style={{ background: 'rgb(67,185,127)' }}
          type='submit'
        >
          Submit
        </Button>
      </Form>
    </>
  )
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addUserData : (email,password) => {dispatch(login(email,password))}
//     }
// }

// export default LoginForm
export default LoginForm
