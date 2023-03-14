import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Card, List, Space, Statistic, Typography } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const New = () => {
  // fetch values from Storage
  let balance_book = JSON.parse(localStorage.getItem('balance_book'))
  let loggedUser = useSelector((state) => state.auth.user)
  let net_transactions = JSON.parse(localStorage.getItem('net_transactions'))
  const owe = balance_book[loggedUser].owe
  const owed = balance_book[loggedUser].owed
  const allNetPayments = net_transactions[loggedUser]
  const transactions = JSON.parse(localStorage.getItem('transaction_book'))[
    loggedUser
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 4
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = currentPage * pageSize
  const currentTransactions = transactions.slice(startIndex, endIndex)

  return (
    <Space
      style={{ paddingInline: '3%', marginTop: '3%', width: '100%' }}
      size={20}
      direction='vertical'
    >
      <Typography.Title level={4}>Dashboard</Typography.Title>

      {/* Net Total Cards */}
      <Space direction='horizontal'>
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: 'green',
                backgroundColor: 'rgba(0,255,0,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={'You Owe'}
          value={owe || 0}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: 'blue',
                backgroundColor: 'lightblue',
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={'Others Owe You'}
          value={owed || 0}
        />
      </Space>

      {/* Transaction Lists */}
      <List
        style={{ backgroundColor: 'white' }}
        size='large'
        bordered
        dataSource={currentTransactions}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: transactions.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />

        {/* Owes Cards */}
      <Space direction='horizontal'>
        {Object.keys(allNetPayments).map((keyName, i) => (
          
          allNetPayments[keyName] && <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: 'green',
                  backgroundColor: 'rgba(0,255,0,0.25)',
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={keyName + ' owes'}
            value={allNetPayments[keyName]}
          />
        ))}
      </Space>
    </Space>
  )
}


// Cards
function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  )
}

export default New
