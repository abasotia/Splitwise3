import React, { useState, useEffect } from 'react'
import { Button, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import Split from '../split/Split'
import './transactions.css'
import { addExpense } from '../../redux/actions/transactionActions'

const Transactions = () => {
  const [data, setData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [description, setDescription] = useState()
  const [selectedUser, setSelectedUser] = useState()
  const [selectedPayee, setSelectedPayee] = useState()
  const [users, setUsers] = useState(
    useSelector((state) => state.auth.allUsers)
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('expensesData'))
    setData(storedData || [])

    // const storedUsers =  existingUsers
    // setUsers(storedUsers || [])
  }, [])

  const pagination = {
    pageSize: '6',
    style: {
      display: 'flex',
      justifyContent: 'center',
    },
  }

  const handleAddExpense = () => {
    let transaction_book = JSON.parse(localStorage.getItem('transaction_book'))
    let net_transactions = JSON.parse(localStorage.getItem('net_transactions'))
    //dispatch(addExpense(inputValue, description, selectedUser, selectedPayee))
    let people_list = ''
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
    //     return
    //   }
    //   splitValue = {}
    //   selectedUser.forEach((user) => {
    //     splitValue[user] = ((inputValue * percentage[user]) / 100).toFixed(2)
    //   })
    // } else {
    //   // splitMethod is 'manual'
    //   if (splitValues.length !== selectedUser.length) {
    //     // Handle error if number of split values doesn't match number of selected users
    //     return
    //   }
    //   splitValue = {}
    //   selectedUser.forEach((user, index) => {
    //     splitValue[user] = splitValues[index]
    //   })
    // }

    const newExpense = {
      total: inputValue,
      description: description ? description : '',
      split_value: (inputValue / selectedUser.length).toFixed(2),
      // split_value: splitValue,
      payee: selectedPayee,
      id: Date.now(),
      PaidFor: people_list,
    }
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
    // console.log(balance_book[])
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

  // const handleDeleteExpense = (expenseId) => {
  //   const updatedData = data.filter((expense) => expense.id !== expenseId)
  //   setData(updatedData)
  //   localStorage.setItem('expensesData', JSON.stringify(updatedData))
  // }

  // const handleClearData = () => {
  //   localStorage.removeItem('expensesData')
  //   setData([])
  // }

  const columns = [
    {
      title: 'Total Value',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount Per Person',
      dataIndex: 'split_value',
      key: 'split_value',
    },
    {
      title: 'Payee',
      dataIndex: 'Payee',
      key: 'Payee',
    },
    {
      title: 'Split between',
      dataIndex: 'PaidFor',
      key: 'PaidFor',
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Button
    //       className='deletebtn'
    //       onClick={() => handleDeleteExpense(record.id)}
    //     >
    //       X
    //     </Button>
    //   ),
    // },
  ]
  return (
    <div className='transac'>
      <h2 className='transac-heading'>Transactions</h2>
      <Table columns={columns} dataSource={data} pagination={pagination} />
    </div>
  )
}

export default Transactions
