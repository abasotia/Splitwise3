import React, { useState, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Select, Space } from 'antd'
import './Split.css'
import { Table } from 'antd'
import { addExpense } from '../../redux/actions/transactionActions'

const { Option } = Select

const Split = () => {
  const [data, setData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [description, setDescription] = useState()
  const [selectedUser, setSelectedUser] = useState()
  const [selectedPayee, setSelectedPayee] = useState()
  const [splitMethod, setSplitMethod] = useState('equal')
  const [percentage, setPercentage] = useState({})
  const [splitValues, setSplitValues] = useState([])
  const [users, setUsers] = useState(
    useSelector((state) => state.auth.allUsers)
  )
  const transactions = useSelector((state) => state.transaction.transaction)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const storedData = transactions
    // const storedData = JSON.parse(localStorage.getItem('expensesData'))
    console.log("Stored Data", storedData)
    setData(storedData || [])

    // const storedUsers =  existingUsers
    // setUsers(storedUsers || [])
  }, [])

  const handleAddExpense = () => {
    let transaction_book = JSON.parse(localStorage.getItem('transaction_book'))
    let net_transactions = JSON.parse(localStorage.getItem('net_transactions'))
    let split_values ={} 
    let people_list = ''

    // check for type of splits
    if (splitMethod === 'equal')
    {
      selectedUser.forEach((user) => {
        split_values[user] = (inputValue / selectedUser.length).toFixed(2)
      })
      selectedUser.map((people) => {
        transaction_book[people].push(
          people +
            ' owe ' +
            (inputValue / selectedUser.length).toFixed(2) +
            ' to ' +
            selectedPayee +
            ' for ' +
            description
        )
  
        if (net_transactions[selectedPayee].hasOwnProperty(people)) {
          net_transactions[selectedPayee][people] =
            parseInt(net_transactions[selectedPayee][people]) +
            parseInt((inputValue / selectedUser.length).toFixed(2))
        } else {
          net_transactions[selectedPayee][people] = (
            inputValue / selectedUser.length
          ).toFixed(2)
        }
        people_list += people
        people_list += ' , '
        return ''
      })
    }
    else if(splitMethod === 'percentage')
    {
      selectedUser.forEach((user) => {
        split_values[user] = (inputValue / selectedUser.length).toFixed(2)
      })
    }
    else
    {
      selectedUser.forEach((user, index) => {
        split_values[user] = splitValues[index]

        transaction_book[user].push(
          user +
            ' owe ' +
            splitValues[index] +
            ' to ' +
            selectedPayee +
            ' for ' +
            description
        )

        if (net_transactions[selectedPayee].hasOwnProperty(user)) {
          net_transactions[selectedPayee][user] =
            parseInt(net_transactions[selectedPayee][user]) +
            parseInt(splitValues[index])
        } else {
          net_transactions[selectedPayee][user] = splitValues[index]
        }
        people_list += user
        people_list += ' , '
        return ''
      })
    }
    // console.log("Before Dispatch", splitValues)
    dispatch(addExpense(description,Date.now(),split_values,selectedUser, selectedPayee, inputValue))

    localStorage.setItem('transaction_book', JSON.stringify(transaction_book))
    localStorage.setItem('net_transactions', JSON.stringify(net_transactions))
    // let splitValue, splitMethod, percentage, splitValues
    // if (splitMethod === 'percentage') {
    //   const totalPercentage = selectedUser.reduce(
    //     (acc, user) => acc + percentage[user],
    //     0
    //   )
    //   if (totalPercentage !== 100) {
    //     // Handle error if total percentage is not 100
    //     return "error"
    //   }
    //   let splitValue = {}
    //   selectedUser.forEach((user) => {
    //     splitValue[user] = ((inputValue * percentage[user]) / 100).toFixed(2)
    //   })
    // } else {
    //   // splitMethod is 'manual'

    //   const splitValuesTemp = selectedUser.map((user) => {
    //     return split_values[user]
    //   })
    //   console.log("splitValuesTemp",splitValuesTemp)
    //   setSplitValues([...splitValuesTemp])
    //   console.log(splitValues)
    //   let n = Object.keys(splitValues).length
    //   if (n !== selectedUser.length) {
    //     // Handle error if number of split values doesn't match number of selected users
    //     return "Error"
    //   }
    //   let splitValue = {}
    //   selectedUser.forEach((user, index) => {
    //     splitValue[user] = splitValues[index]
    //   })
    // }


    // create New Expense template for ExpensesData
    const newExpense = {
      total: inputValue,
      description: description ? description : '',
      split_value: (inputValue / selectedUser.length).toFixed(2),
      // split_value: splitValue,
      payee: selectedPayee,
      id: Date.now(),
      PaidFor: people_list,
    }

    // Update ExpensesData
    const updatedData = [...data, newExpense]
    console.log(updatedData)
    setData(updatedData)
    console.log('qwertyu')
    localStorage.setItem('expensesData', JSON.stringify(updatedData))
    dispatch(
      addExpense(
        newExpense.description,
        newExpense.id,
        newExpense.split_value,
        newExpense.PaidFor,
        newExpense.payee,
        newExpense.total
      )
    )

    let balance_book = JSON.parse(localStorage.getItem('balance_book'))
    balance_book[newExpense.payee].owed += parseInt(newExpense.total)
    selectedUser.forEach((user) => {
      if (newExpense.payee === user) {
        balance_book[user].owed -= parseInt(newExpense.split_value)
      } else {
        balance_book[user].owe += parseInt(newExpense.split_value)
      }
    })
    console.log(balance_book)
    localStorage.setItem('balance_book', JSON.stringify(balance_book))
    setInputValue('')
    setSelectedUser()
    setSelectedPayee()
  }

  // const handleClearData = () => {
  //   localStorage.removeItem('expensesData')
  //   setData([])
  // }

  return (
    <div id='split_mainContainer'>
      <div className='container'>
        <Space className='addExpense'>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Amount'
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
          />
          <Select
            value={selectedUser}
            onChange={(value) => setSelectedUser(value)}
            placeholder='Select People for Splitting'
            className='users_list'
            mode='multiple'
          >
            {users.map((user) => (
              <Option key={user.email} value={user.name}>
                {user.name}
              </Option>
            ))}
          </Select>

          <Select
            value={selectedPayee}
            onChange={(value) => setSelectedPayee(value)}
            placeholder='Select Payee'
            className='users_list'
          >
            {users.map((user) => (
              <Option key={user.email} value={user.name}>
                {user.name}
              </Option>
            ))}
          </Select>

          <Space>
            <Button
              type={splitMethod === 'equal' ? 'primary' : 'default'}
              onClick={() => setSplitMethod('equal')}
            >
              Split equally
            </Button>
            <Button
              type={splitMethod === 'percentage' ? 'primary' : 'default'}
              onClick={() => setSplitMethod('percentage')}
            >
              Split by percentage
            </Button>
            <Button
              type={splitMethod === 'manual' ? 'primary' : 'default'}
              onClick={() => setSplitMethod('manual')}
            >
              Split manually
            </Button>
          </Space>

          {/* <Select
            value={selectedPayee}
            // onChange={(value) => setSelectedPayee(value)}
            onChange={(value) =>
              dispatch({ type: 'SET_SELECTED_PAYEE', payload: value })
            }
            placeholder='Select Payee'
            className='users_list'
          >
            {users.map((user) => (
              <Option key={user.email} value={user.name}>
                {user.name}
              </Option>
            ))}
          </Select> */}
          <Input
            value={splitValues}
            onChange={(e) => {
              let splitValuesInput = e.target.value.split(",")
              console.log("splitValuesInput",splitValuesInput)
              setSplitValues(splitValuesInput)

            }}
            placeholder='Enter comma seperated values'
          />

          <Button onClick={() => handleAddExpense()}>Add Expense</Button>
          {/* <Button onClick={handleClearData}>Clear Local Storage</Button> */}
        </Space>
      </div>

      {/* <Table columns={columns} dataSource={data} pagination={pagination} /> */}
    </div>
  )
}

export default Split
