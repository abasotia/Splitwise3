import { useSelector } from 'react-redux'
import New from './New'

const Dashboard = () => {
  const trans = localStorage.getItem('net_transactions')
  // console.log(trans)
  // const trans = JSON.parse(localStorage.getItem('net_transactions')) // convert string to object
  // const loggedIn = localStorage.getItem('loggedUser')
  const loggedIn = useSelector((state) => state.auth.user)
  console.log(trans, loggedIn)
  return (
    <>
      <div style={{ backgroundColor: 'lightblue', width: '100%' }}>
        <New></New>
        {/* {trans} */}
      </div>
    </>
  )
}
export default Dashboard
