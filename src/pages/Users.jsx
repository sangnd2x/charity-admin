import React from 'react'
import Sidebar from '../components/Sidebar'

const Users = () => {
  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
    <div>
      <Sidebar />
    </div>
    <div className='container'>
      <div className="top-section">
        <div className="title">
          <h3>Users</h3>
          <input type="text" placeholder='Search' className='searchBar'/> 
        </div>
      </div>
      <div className="newCharity-container row">
        
      </div>
    </div>
  </div>
  )
}

export default Users
