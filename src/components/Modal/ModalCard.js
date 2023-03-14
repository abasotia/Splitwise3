import { Modal, Input, Select, Space, Button } from 'antd'
import { React, useState } from 'react'

const ModalCard = () => {
  // const AddExpenseModal = ({ users, visible, onCancel, onAddExpense }) => {
  //   const [inputValue, setInputValue] = useState('')
  //   const [description, setDescription] = useState('')
  //   const [selectedUser, setSelectedUser] = useState([])
  //   const [selectedPayee, setSelectedPayee] = useState('')

  //   const handleAddExpense = () => {
  //     // Pass the selectedUser and selectedPayee values as an object to onAddExpense function
  //     onAddExpense({
  //       selectedUser,
  //       selectedPayee,
  //       amount: inputValue,
  //       description,
  //     })
  //     // Clear the input values
  //     setInputValue('')
  //     setDescription('')
  //     setSelectedUser([])
  //     setSelectedPayee('')
  //     // Close the modal
  //     onCancel()
  //   }

  //   const handleClearData = () => {
  //     localStorage.clear()
  //   }
  //   return (
  //     <>
  //       <Modal
  //         title='Add Expense'
  //         visible={visible}
  //         onCancel={onCancel}
  //         footer={null}
  //       >
  //         <Space className='addExpense'>
  //           <Input
  //             value={inputValue}
  //             onChange={(e) => setInputValue(e.target.value)}
  //             placeholder='Amount'
  //           />
  //           <Input
  //             value={description}
  //             onChange={(e) => setDescription(e.target.value)}
  //             placeholder='Description'
  //           />
  //           <Select
  //             value={selectedUser}
  //             onChange={(value) => setSelectedUser(value)}
  //             placeholder='Select People for Splitting'
  //             className='users_list'
  //             mode='multiple'
  //           >
  //             {users.map((user) => (
  //               <Select.Option key={user.email} value={user.name}>
  //                 {user.name}
  //               </Select.Option>
  //             ))}
  //           </Select>

  //           <Select
  //             value={selectedPayee}
  //             onChange={(value) => setSelectedPayee(value)}
  //             placeholder='Select Payee'
  //             className='users_list'
  //           >
  //             {users.map((user) => (
  //               <Select.Option key={user.email} value={user.name}>
  //                 {user.name}
  //               </Select.Option>
  //             ))}
  //           </Select>

  //           <Button onClick={handleAddExpense}>Add Expense</Button>
  //           <Button onClick={handleClearData}>Clear Local Storage</Button>
  //         </Space>
  // </Modal>
  // </>
  // )

  const ModalCard = ({ users, visible, onCancel, onAddExpense }) => {
    const [inputValue, setInputValue] = useState('')
    const [description, setDescription] = useState('')
    const [selectedUser, setSelectedUser] = useState([])
    const [selectedPayee, setSelectedPayee] = useState('')

    const handleAddExpense = () => {
      // Pass the selectedUser and selectedPayee values as an object to onAddExpense function
      onAddExpense({
        selectedUser,
        selectedPayee,
        amount: inputValue,
        description,
      })
      // Clear the input values
      setInputValue('')
      setDescription('')
      setSelectedUser([])
      setSelectedPayee('')
      // Close the modal
      onCancel()
    }

    const handleClearData = () => {
      localStorage.clear()
    }

    return (
      <Modal
        title='Add Expense'
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
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
              <Select.Option key={user.email} value={user.name}>
                {user.name}
              </Select.Option>
            ))}
          </Select>

          <Select
            value={selectedPayee}
            onChange={(value) => setSelectedPayee(value)}
            placeholder='Select Payee'
            className='users_list'
          >
            {users.map((user) => (
              <Select.Option key={user.email} value={user.name}>
                {user.name}
              </Select.Option>
            ))}
          </Select>

          <Button onClick={handleAddExpense}>Add Expense</Button>
          <Button onClick={handleClearData}>Clear Local Storage</Button>
        </Space>
      </Modal>
    )
  }

  //   }
}

export default ModalCard
