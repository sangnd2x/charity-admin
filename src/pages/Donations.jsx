import { useState, useEffect } from 'react';
import axiosReq from '../components/api/axios';
import Sidebar from '../components/Sidebar';
import { Table } from 'react-bootstrap';

const Donations = () => {
  const [donations, setDonations] = useState([]);

  // Search
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await axiosReq.get('/admin/donations');
      console.log(response.data);
      setDonations(response.data);
    }

    fetchDonations();
  }, [searched]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (query) {
      setSearched(true);
    } else {
      setSearched(false);
    }

    const fetchSearchedDonation = async () => {
      const response = await axiosReq.get(`/admin/search/donation/${query}`);
      console.log(response);
      setDonations(response.data);
    }

    fetchSearchedDonation();
  }

  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
    <div>
      <Sidebar />
    </div>
    <div className='container'>
      <div className="top-section p-3">
        <div className="title">
          <h3>Donations</h3>
            <input type="text" placeholder='Search' className='searchBar'
            onChange={(e) => handleSearch(e)}/> 
        </div>
      </div>
      <div className="newCharity-container row px-5">
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

export default Donations