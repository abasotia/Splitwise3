import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { connect, useDispatch, useSelector } from 'react-redux'
import { login, signup } from '../../../redux/actions/authActions'

const SignUpForm = ({ loginSuccess, loginFailure }) => {
  const [inpval, setInpval] = useState({
    name: '',
    email: '',
    date: '',
    password: '',
  })
  const dispatch = useDispatch()
  const existingUsers = useSelector((state) => state.auth.allUsers)
  const expensesData = useSelector((state) => state.transaction.transaction)
  console.log('Existing', existingUsers)
  console.log(inpval)

  const getdata = (e) => {
    // console.log(e.target.value)      //LODASH   _get
    const { value, name } = e.target
    // console.log(value, name)

    setInpval((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const addData = (e) => {
    e.preventDefault()
    const { name, email, date, password } = inpval

    if (name === '') {
      alert(' name field is requred!')
    } else if (email === '') {
      alert('email field is requred')
    } else if (!email.includes('@')) {
      alert('plz enter valid email addres')
    } else if (date === '') {
      alert('date field is requred')
    } else if (password === '') {
      alert('password field is requred')
    } else if (password.length < 5) {
      alert('password length greater five')
    } else {
      console.log('data added succesfully')

      // Get existing users data from local storage
      // const existingUsers = useSelector((state) => state.allUsers)

      // Add the new user to the list of users
      // console.log('existing', existingUsers)
      const updatedUsers = [...existingUsers, inpval]
      // console.log('updated', updatedUsers)

      // Store the updated list of users in local storage
      localStorage.setItem('usersw', JSON.stringify(updatedUsers)) //LODASH _include ,_map , foreach
      dispatch(signup(name, date, email, password))
      let balance_book = {}
      let transaction_book = {}
      console.log(inpval)
      if (localStorage.getItem('balance_book')) {
        balance_book = JSON.parse(localStorage.getItem('balance_book'))
        if (inpval.name in balance_book) {
          console.log('Already Registered')
        } else {
          balance_book[inpval.name] = {
            owe: 0,
            owed: 0,
          }
        }
      } else {
        balance_book[inpval.name] = {
          owe: 0,
          owed: 0,
        }
      }
      localStorage.setItem('balance_book', JSON.stringify(balance_book))

      if (localStorage.getItem('transaction_book')) {
        transaction_book = JSON.parse(localStorage.getItem('transaction_book'))
        if (transaction_book.hasOwnProperty(inpval.name)) {
          console.log('Already Registered')
        }
      }
      transaction_book[inpval.name] = []
      // console.log(transaction_book)
      localStorage.setItem('transaction_book', JSON.stringify(transaction_book))

      let net_transactions = {}
      if (localStorage.getItem('net_transactions')) {
        net_transactions = JSON.parse(localStorage.getItem('net_transactions'))
        if (net_transactions.hasOwnProperty(inpval.name)) {
          console.log('Already Registered')
        }
      }
      net_transactions[inpval.name] = {}
      localStorage.setItem('net_transactions', JSON.stringify(net_transactions))
      // localStorage.setItem('expensesData', expensesData)
    }
  }
  return (
    <>
      <Form>
        <Form.Group className='mb-3 col-lg-6' controlId='formBasicEmail'>
          <Form.Control
            type='text'
            name='name'
            onChange={getdata}
            // onChange={(e) => {
            //   setInpval((prev) => ({ ...prev, email: e.target.val }))
            // }}
            placeholder='Enter your name'
          />
        </Form.Group>

        <Form.Group className='mb-3 col-lg-6' controlId='formBasicEmail'>
          <Form.Control type='date' name='date' onChange={getdata} />
        </Form.Group>

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
          style={{ background: 'rgb(67,185,127' }}
          type='submit'
        >
          Submit
        </Button>
      </Form>
    </>
  )
}

const dispatchEvent = {
  login,
}

// export default LoginForm
export default connect(null, dispatchEvent)(SignUpForm)

// export default SignUpForm
