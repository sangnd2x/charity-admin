import React from 'react'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className='d-flex flex-row'>
      <div>
        <Sidebar />
      </div>
      <div>
        Dashboard
      </div>
    </div>
  )
}

export default Dashboard
