import React from 'react'
import Sidebar from '../components/Sidebar'
import { Table } from 'react-bootstrap'

const Donations = () => {
  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
    <div>
      <Sidebar />
    </div>
    <div className='container'>
      <div className="top-section p-3">
        <div className="title">
          <h3>Donations</h3>
          <input type="text" placeholder='Search' className='searchBar'/> 
        </div>
      </div>
      <div className="newCharity-container row px-5">
        <Table striped hover className='dashboard-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Charity</th>
              <th>Donated</th>
              <th>Donated At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Charity 1</td>
              <td>$20.00</td>
              <td>29-01-2023</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Bob</td>
              <td>Charity 2</td>
              <td>$55.00</td>
              <td>29-01-2023</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Jay</td>
              <td>Charity 3</td>
              <td>$40.00</td>
              <td>30-01-2023</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  </div>
  )
}

export default Donations