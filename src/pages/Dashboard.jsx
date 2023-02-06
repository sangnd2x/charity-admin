import { useState, useEffect } from 'react';
import axiosReq from '../components/api/axios';
import Sidebar from '../components/Sidebar';
import { BsFillWalletFill, BsFillHeartFill, BsFillPeopleFill } from 'react-icons/bs';
import { Table } from 'react-bootstrap';

const Dashboard = () => {
  const [charities, setCharities] = useState([]);
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCharities = async () => {
      const response = await axiosReq('/admin/charities');
      setCharities(response.data.charities);
    }
    const fetchDonations = async () => {
      const response = await axiosReq('/admin/donations');
      setDonations(response.data);
    }
    const fetchUsers = async () => {
      const response = await axiosReq('/admin/users');
      setUsers(response.data);
    }

    fetchCharities();
    fetchDonations();
    fetchUsers();
  }, []);

  const totalDonation = donations.map(donation => parseInt(donation.amount)).reduce((a, b) => a + b, 0);

  return (
    <div className='d-flex flex-row'>
      <div>
        <Sidebar />
      </div>
      <div className='container'>
        <div className="top-section p-3">
          <div className="title">
            <h3>Dashboard</h3>
            <input type="text" placeholder='Search' className='searchBar'/> 
          </div>
        </div>

        <div className="dashboardCard-container row px-3">
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <div className="card d-flex flex-row justify-content-around align-items-center" style={{ width: '28rem', height: 'auto' }} >
              <div className="card-body" style={{ margin: '3px' }}>
                <div className="card-title">
                  <h2>Charities</h2>
                </div>
                <div className="card-text">
                  <p>On-going: {charities.filter(charity => charity.status === 'ongoing').length}</p>
                  <p>Up-coming: {charities.filter(charity => charity.status === 'upcoming').length}</p>
                </div>
              </div>
              <div>
                <BsFillHeartFill style={{ width: '60px', height: '60px', marginRight: '20px', color: 'rgba(229, 124, 102, 1)'}}/>
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
                  <p>Donations: {donations.length}</p>
                  <p>Amount: {Intl.NumberFormat('en-US').format(totalDonation)} VND</p>
                </div>
              </div>
              <div>
                <BsFillWalletFill style={{ width: '60px', height: '60px', marginRight: '20px', color: 'rgba(109, 188, 166, 1)'}}/>
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
                  <p>Admins: {users.filter(user => user.role === 'admin').length}</p>
                  <p>Donors: {users.filter(user => user.role === 'donor').length}</p>
                </div>
              </div>
              <div>
                <BsFillPeopleFill style={{ width: '60px', height: '60px', marginRight: '20px', color: 'rgba(238, 192, 119, 1)'}}/>
              </div>
            </div>
          </div>
        </div>

        <div className="latestDonations-container px-4">
          <Table striped hover className='dashboard-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Donor</th>
                <th>Charity</th>
                <th>Donated</th>
                <th>Donated At</th>
              </tr>
            </thead>
            <tbody>
              {donations && donations.map(donation => (
              <tr key={donation._id}>
                <td>{donation._id}</td>
                <td>{donation.user.username}</td>
                <td>{donation.charity.charityName}</td>
                <td>VND {Intl.NumberFormat('en-US').format(donation.amount)}</td>
                <td>{new Date(donation.donatedAt).toLocaleDateString('en-GB')}</td>
              </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
