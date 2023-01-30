import React from 'react'
import Sidebar from '../components/Sidebar'
import { Table } from 'react-bootstrap'

const Users = () => {
  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
    <div>
      <Sidebar />
    </div>
    <div className='container'>
      <div className="top-section p-3">
        <div className="title">
          <h3>Users</h3>
          <input type="text" placeholder='Search' className='searchBar'/> 
        </div>
      </div>
      <div className="newCharity-container row px-5">
      <Table striped hover className='dashboard-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registerd At</th>
              <th>Lastest Donation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>markcuban@mark.com</td>
              <td>20-01-2023</td>
              <td>29-01-2023</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Bob</td>
              <td>bobdylan@bob.com</td>
              <td>22-01-2023</td>
              <td>29-01-2023</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Jay</td>
              <td>jayz@gmail.com</td>
              <td>25-01-2023</td>
              <td>30-01-2023</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  </div>
  )
}

export default Users
