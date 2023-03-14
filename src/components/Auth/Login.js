import React from 'react'
import Sign_img from './Sign_img'
import { NavLink } from 'react-router-dom'
import LoginForm from './LoginForm/LoginForm'

const Login = () => {
  return (
    <>
      <div className='container mt-3'>
        <section className='d-flex justify-content-between'>
          <div className='left_data p-5' style={{ width: '100%' }}>
            <h3 className='text-center col-lg-6'>Sign In</h3>
            {/* <Form>
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
                style={{ background: 'rgb(67,185,127)' }}
                type='submit'
              >
                Submit
              </Button>
            </Form> */}
            <LoginForm />
            <p className='mt-3'>
              Don't Have an account{' '}
              <span>
                <NavLink to='/signup'>Sign Up</NavLink>
              </span>
            </p>
          </div>
          <Sign_img />
        </section>
      </div>
    </>
  )
}

export default Login
