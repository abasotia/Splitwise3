import React, { useState, useEffect, useReducer } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Layout, Button, Select } from 'antd'
import {
  UserOutlined,
  HomeOutlined,
  SplitCellsOutlined,
  AreaChartOutlined,
  TransactionOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import './Navbar.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import logo from './splitwise_logo.png'
import { login } from '../../redux/actions/authActions'

const { Header, Sider } = Layout

const SideNavbar = () => {
  return (
    <Sider>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <img
          src={logo}
          alt='Splitwise Logo'
          style={{
            width: '50%',
            marginRight: '16px',
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to='/dashboard'>
          <Button type='link' icon={<DashboardOutlined />}>
            Home
          </Button>
        </Link>
        <Link to='/split'>
          <Button type='link' icon={<SplitCellsOutlined />}>
            Split
          </Button>
        </Link>
        <Link to='/transactions'>
          <Button type='link' icon={<TransactionOutlined />}>
            Transactions
          </Button>
        </Link>
        <Link to='/Analytics'>
          <Button type='link' icon={<AreaChartOutlined />}>
            Analytics
          </Button>
        </Link>
        <Link to='/Group'>
          <Button type='link' icon={<UserOutlined />}>
            Group
          </Button>
        </Link>
        <Link to='/Profile'>
          <Button type='link' icon={<HomeOutlined />}>
            Profile
          </Button>
        </Link>
      </div>
    </Sider>
  )
}

const { Option } = Select

const UpperNavbar = () => {
  const [users, setUsers] = useState([])
  const [loggedUser, setLoggedUser] = useState(
    useSelector((state) => state.auth.user)
  )
  const dispatch = useDispatch()
  const existingUsers = useSelector((state) => state.auth.allUsers)
  useEffect(() => {
    const storedUsers = existingUsers
    console.log(storedUsers)
    setUsers(storedUsers)
  }, [])

  function changeLoggedUser(user) {
    localStorage.setItem('loggedUser', user)
    console.log('Give logged User', user)
    dispatch(login(user))
    window.location.reload()
  }

  return (
    <Header
      className='header'
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <div></div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          style={{ marginRight: '16px' }}
          onChange={(value) => changeLoggedUser(value)}
          placeholder={loggedUser}
          className='users'
        >
          {users.map((user) => (
            <Option key={user.email} value={user.name}>
              {user.name}
            </Option>
          ))}
        </Select>
        <Link to='/'>
          <Button style={{ marginLeft: '16px' }}>Logout</Button>
        </Link>
      </div>
    </Header>
  )
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Neche ka code agar reducer add krne ka try upper navbar me

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// const UpperNavbar = () => {
//   const [state, dispatch] = useReducer(reducer, { users: [], loggedUser: null })

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem('usersw'))
//     dispatch({ type: 'SET_USERS', payload: storedUsers || [] })
//     const loggedIn = localStorage.getItem('loggedUser')
//     dispatch({ type: 'SET_LOGGED_USER', payload: loggedIn || storedUsers[0] })
//   }, [])

//   function changeLoggedUser(user) {
//     localStorage.setItem('loggedUser', user)
//     dispatch({ type: 'SET_LOGGED_USER', payload: user })
//     window.location.reload()
//   }

//   return (
//     <Header
//       className='header'
//       style={{ display: 'flex', justifyContent: 'space-between' }}
//     >
//       <div></div>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <Select
//           style={{ marginRight: '16px' }}
//           onChange={(value) => changeLoggedUser(value)}
//           placeholder={state.loggedUser}
//           className='users'
//         >
//           {state.users.map((user) => (
//             <Option key={user.email} value={user.name}>
//               {user.name}
//             </Option>
//           ))}
//         </Select>
//         <Link to='/'>
//           <Button style={{ marginLeft: '16px' }}>Logout</Button>
//         </Link>
//       </div>
//     </Header>
//   )
// }

// function reducer(state, action) {
//   switch (action.type) {
//     case 'SET_USERS':
//       return { ...state, users: action.payload }
//     case 'SET_LOGGED_USER':
//       return { ...state, loggedUser: action.payload }
//     default:
//       throw new Error(`Unsupported action type: ${action.type}`)
//   }
// }

const Navbar = (props) => {
  return (
    <div>
      <UpperNavbar />
      <Layout style={{ display: 'flex', minHeight: '100vh' }}>
        <SideNavbar />
        <Outlet />
      </Layout>
    </div>
  )
}

export default Navbar
