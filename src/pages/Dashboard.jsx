import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosReq from '../components/api/axios';
import Sidebar from '../components/Sidebar';
import { BsFillWalletFill, BsFillHeartFill, BsFillPeopleFill } from 'react-icons/bs';
import { FaCalendarAlt, FaRegEnvelope, FaIdCardAlt, FaEnvelope, FaUserAlt } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import Pagination from '../components/Pagination';
import UserAvt from '../assets/img/male-avt.svg';

const Dashboard = () => {
  const navigate = useNavigate();
  const [charities, setCharities] = useState([]);
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  const [user, setUser] = useState([]);

  // Sum of total donations
  const totalDonation = donations.map(donation => parseInt(donation.amount)).reduce((a, b) => a + b, 0);

  // Fetch data for cards
  useEffect(() => {
    const fetchCharities = async () => {
      const response = await axiosReq.get('/admin/charities');
      setCharities(response.data.charities);
    }
    const fetchDonations = async () => {
      const response = await axiosReq.get('/admin/donations');
      setDonations(response.data);
    }
    const fetchUsers = async () => {
      const response = await axiosReq.get('/admin/users');
      setUsers(response.data);
    }

    const fetchUser = async () => {
      const response = await axiosReq(`/admin/users/${userId}`);
      setUser(response.data);
    }

    fetchDonations();
    fetchCharities();
    fetchUsers();
    fetchUser();
  }, []);


  // Pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(8);
  const startIndex = (page - 1) * count;
  const endIndex = page * count;

  // Change password
  const changePassword = () => {
    const userId = sessionStorage.getItem('userId');
    navigate(`/user/edit-password/${userId}}`);
  }

  // Edit user's info
  const editInfo = () => {
    navigate(`/user/edit-info/${userId}`);
  }

  return (
    <div className='d-flex flex-row'>
      <div>
        <Sidebar />
      </div>
      <div className='container'>
        <div className="my-4 mx-4">
          <div className="d-flex mt-4 justify-content-between align-items-start">
            <h3>Dashboard</h3>
          </div>
        </div>
        <div>
          <div className="d-flex flex-row justify-content-between">
            <div className="dashboard-contents col-9">
              <div className="d-flex flex-row mt-4">
                <div className="col-xl-4 col-lg-4 col-md-3 d-flex justify-content-center">
                  <div className="d-flex flex-row align-items-center justify-content-around dashboard-card border-red">
                    <div>
                      <h2>Charities</h2>
                      <p>On-going: {charities.filter(charity => charity.status === 'ongoing').length}</p>
                      <p>Up-coming: {charities.filter(charity => charity.status === 'upcoming').length}</p>
                    </div>
                    <div>
                      <BsFillHeartFill className='dashboard-icon' style={{ color: 'rgba(196, 65, 69, 1)'}}/>
                    </div>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <div className="d-flex flex-row justify-content-around align-items-center dashboard-card border-green">
                    <div>
                      <h2>Donations</h2>
                      <p>Donations: {donations.length}</p>
                      <p>Amount: {Intl.NumberFormat('en-US').format(totalDonation)} VND</p>
                    </div>
                    <div>
                      <BsFillWalletFill className='dashboard-icon' style={{ color: 'rgba(80, 173, 122, 1)'}}/>
                    </div>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <div className="d-flex flex-row justify-content-around align-items-center dashboard-card border-yellow">
                    <div>
                      <h2>Users</h2>
                      <p>Admins: {users.filter(user => user.role === 'admin').length}</p>
                      <p>Donors: {users.filter(user => user.role === 'donor').length}</p>
                    </div>
                    <div>
                      <BsFillPeopleFill className='dashboard-icon' style={{ color: 'rgba(244, 181, 86, 1)'}}/>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <h4 className='ms-2'>Latest Donations</h4>
              </div>
              <div className="mx-2 border table-responsive">
                <table className='table table-responsive'>
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
                    {donations && donations.slice(startIndex, endIndex).map(donation => (
                      <tr key={donation._id}>
                        <td>{donation._id}</td>
                        <td>{donation.user.username}</td>
                        <td>{donation.charity.charityName}</td>
                        <td>VND {Intl.NumberFormat('en-US').format(donation.amount)}</td>
                        <td>{new Date(donation.donatedAt).toLocaleDateString('en-GB')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {user && (
              <div className="user d-flex flex-column align-items-center justify-content-around my-5 col-3">
                <div className='d-flex flex-column align-items-center'>
                  <img src={user.avatar} alt="user avatar" width={100} style={{ borderRadius: '50px'}} />
                  <h2>{user.username}</h2>
                </div>
                <div className=''>
                  <p><FaIdCardAlt className='user-icon'/> {user.role}</p>
                  <p><FaEnvelope className='user-icon'/> {user.email}</p>
                  <p><FaCalendarAlt className='user-icon'/> {new Date(user.createdAt).toLocaleDateString('en-GB')}</p>
                  <p><FaUserAlt className='user-icon' /> {user.status}</p>
                </div>
                <div className='d-flex flex-column align-items-center'>
                  <button
                    type='button'
                    className='user-button'
                    onClick={changePassword}
                  >
                    Change Password
                  </button>
                  <button
                    type='button'
                    className='user-button'
                    onClick={editInfo}
                  >
                    Edit Info
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
