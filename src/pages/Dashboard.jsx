import React from 'react'
import Sidebar from '../components/Sidebar'
import { BsFillWalletFill, BsFillHeartFill, BsFillPeopleFill } from 'react-icons/bs';
import { Table } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div className='d-flex flex-row'>
      <div>
        <Sidebar />
      </div>
      <div className='container'>
        <div className="top-section">
          <div className="title">
            <h3>Dashboard</h3>
            <input type="text" placeholder='Search' className='searchBar'/> 
          </div>
        </div>

        <div className="dashboardCard-container row">
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <div className="card d-flex flex-row justify-content-around align-items-center" style={{ width: '28rem', height: 'auto' }} >
              <div className="card-body" style={{ margin: '3px' }}>
                <div className="card-title">
                  <h2>Charities</h2>
                </div>
                <div className="card-text">
                  <p>On-going: 20</p>
                  <p>Up-coming: 12</p>
                </div>
              </div>
              <div>
                <BsFillHeartFill style={{ width: '60px', height: '60px', marginRight: '20px'}}/>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <div className="card d-flex flex-row justify-content-around align-items-center" style={{ width: '28rem', height: 'auto' }} >
              <div className="card-body" style={{ margin: '3px' }}>
                <div className="card-title">
                  <h2>Total Donations</h2>
                </div>
                <div className="card-text">
                  <p>Donations: 200</p>
                  <p>Amount: $1,200,000</p>
                </div>
              </div>
              <div>
                <BsFillWalletFill style={{ width: '60px', height: '60px', marginRight: '20px'}}/>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <div className="card d-flex flex-row justify-content-around align-items-center" style={{ width: '28rem', height: 'auto' }} >
              <div className="card-body" style={{ margin: '3px' }}>
                <div className="card-title">
                  <h2>Users</h2>
                </div>
                <div className="card-text">
                  <p>Admins: 10</p>
                  <p>Donors: 320</p>
                </div>
              </div>
              <div>
                <BsFillPeopleFill style={{ width: '60px', height: '60px', marginRight: '20px'}}/>
              </div>
            </div>
          </div>
        </div>

        <div className="latestDonations-container">
          <Table striped hover className='dashboard-table'>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
