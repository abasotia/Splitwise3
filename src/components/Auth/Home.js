import React, { useState } from 'react'
import Sign_img from './Sign_img'
import { NavLink } from 'react-router-dom'
import SignUpForm from './SignUpForm/SignUpForm'

const Home = () => {
  return (
    <>
      <div className='container mt-3'>
        <section className='d-flex justify-content-between'>
          <div className='left_data p-5' style={{ width: '100%' }}>
            <h3 className='text-center col-lg-6'>Sign Up</h3>
            {/* <Form>
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

              <Form.Group
                className='mb-3 col-lg-6'
                controlId='formBasicPassword'
              >
                <Form.Control
                  type='password'
                  name='password'
                  onChange={getdata}
                  placeholder='Password'
                />
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='formBasicCheckbox'
              ></Form.Group>
              <Button
                variant='primary'
                className='col-lg-6'
                onClick={addData}
                style={{ background: 'rgb(67,185,127' }}
                type='submit'
              >
                Submit
              </Button>
            </Form> */}
            <SignUpForm />
            <p className='mt-3'>
              Already Have an Account{' '}
              <span>
                <NavLink to='/'>SignIN</NavLink>
              </span>
            </p>
          </div>
          <Sign_img />
        </section>
      </div>
    </>
  )
}

export default Home

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Neche ka code agar reducer add krne ka try

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Sign_img from './Sign_img'
// import { NavLink } from 'react-router-dom'

// const Home = () => {
//   const dispatch = useDispatch()
//   // const users = useSelector((state) => state.users)
//   const loggedUser = useSelector((reduxStore) => reduxStore.reduce.loggedUser)

//   const [inpval, setInpval] = useState({
//     name: '',
//     email: '',
//     date: '',
//     password: '',
//   })

//   const getdata = (e) => {
//     const { value, name } = e.target
//     setInpval((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       }
//     })
//   }

//   const addData = (e) => {
//     e.preventDefault()
//     const { name, email, date, password } = inpval

//     if (name === '') {
//       alert(' name field is requred!')
//     } else if (email === '') {
//       alert('email field is requred')
//     } else if (!email.includes('@')) {
//       alert('plz enter valid email addres')
//     } else if (date === '') {
//       alert('date field is requred')
//     } else if (password === '') {
//       alert('password field is requred')
//     } else if (password.length < 5) {
//       alert('password length greater five')
//     } else {
//       console.log('data added succesfully')

//       // Add the new user to the list of users
//       dispatch({
//         type: 'SIGN_UP',
//         payload: inpval,
//       })

//       // Clear the form
//       setInpval({
//         name: '',
//         email: '',
//         date: '',
//         password: '',
//       })

//       let balance_book = {}
//       let transaction_book = {}
//       console.log(inpval)
//       if (localStorage.getItem('balance_book')) {
//         balance_book = JSON.parse(localStorage.getItem('balance_book'))
//         if (inpval.name in balance_book) {
//           console.log('Already Registered')
//         } else {
//           balance_book[inpval.name] = {
//             owe: 0,
//             owed: 0,
//           }
//         }
//       } else {
//         balance_book[inpval.name] = {
//           owe: 0,
//           owed: 0,
//         }
//       }
//       localStorage.setItem('balance_book', JSON.stringify(balance_book))

//       if (localStorage.getItem('transaction_book')) {
//         transaction_book = JSON.parse(localStorage.getItem('transaction_book'))
//         if (transaction_book.hasOwnProperty(inpval.name)) {
//           console.log('Already Registered')
//         }
//       }
//       transaction_book[inpval.name] = []
//       localStorage.setItem('transaction_book', JSON.stringify(transaction_book))

//       let net_transactions = {}
//       if (localStorage.getItem('net_transactions')) {
//         net_transactions = JSON.parse(localStorage.getItem('net_transactions'))
//         if (net_transactions.hasOwnProperty(inpval.name)) {
//           console.log('Already Registered')
//         }
//       }
//       net_transactions[inpval.name] = {}
//       localStorage.setItem('net_transactions', JSON.stringify(net_transactions))
//     }
//   }

//   return (
//     <>
//       <div className='container mt-3'>
//         <section className='d-flex justify-content-between'>
//           <div className='left_data p-5' style={{ width: '100%' }}>
//             <h3 className='text-center col-lg-6'>Sign Up</h3>
//             <Form>
//               <Form.Group className='mb-3 col-lg-6' controlId='formBasicEmail'>
//                 <Form.Control
//                   type='text'
//                   name='name'
//                   onChange={getdata}
//                   // onChange={(e) => {
//                   //   setInpval((prev) => ({ ...prev, email: e.target.val }))
//                   // }}
//                   placeholder='Enter your name'
//                 />
//               </Form.Group>

//               <Form.Group className='mb-3 col-lg-6' controlId='formBasicEmail'>
//                 <Form.Control type='date' name='date' onChange={getdata} />
//               </Form.Group>

//               <Form.Group className='mb-3 col-lg-6' controlId='formBasicEmail'>
//                 <Form.Control
//                   type='email'
//                   name='email'
//                   onChange={getdata}
//                   placeholder='Enter your email'
//                 />
//               </Form.Group>

//               <Form.Group
//                 className='mb-3 col-lg-6'
//                 controlId='formBasicPassword'
//               >
//                 <Form.Control
//                   type='password'
//                   name='password'
//                   onChange={getdata}
//                   placeholder='Password'
//                 />
//               </Form.Group>
//               <Form.Group
//                 className='mb-3'
//                 controlId='formBasicCheckbox'
//               ></Form.Group>
//               <Button
//                 variant='primary'
//                 className='col-lg-6'
//                 onClick={addData}
//                 style={{ background: 'rgb(67,185,127' }}
//                 type='submit'
//               >
//                 Submit
//               </Button>
//             </Form>
//             <p className='mt-3'>
//               Already Have an Account{' '}
//               <span>
//                 <NavLink to='/'>SignIN</NavLink>
//               </span>
//             </p>
//           </div>
//           <Sign_img />
//         </section>
//       </div>
//     </>
//   )
// }

// export default Home
