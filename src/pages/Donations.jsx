import { useState, useEffect } from 'react';
import axiosReq from '../components/api/axios';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination';
import { BsFillWalletFill, BsFillHeartFill, BsFillPeopleFill } from 'react-icons/bs';

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const totalRaised = donations.map(donation => +donation.amount).reduce((a, b) => a + b, 0);
  const totalDonors = donations.map(donation => donation.user.username).filter((v, i, a) => a.indexOf(v) === i).length;
  console.log(totalDonors);
  // Search
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await axiosReq.get('/admin/donations');
      // console.log(response.data);
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

   // Pagination
   const [page, setPage] = useState(1);
   const [count, setCount] = useState(8);
   const startIndex = (page - 1) * count;
   const endIndex = page * count;

  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
    <div>
      <Sidebar />
    </div>
    <div className='container'>
      <div className="m-2">
        <div className="d-flex mt-4 justify-content-between align-items-start">
          <h3>Donations</h3>
            <input
              type="text"
              placeholder="Search Donor's name"
              className='searchBar'
              onChange={(e) => handleSearch(e)}
            /> 
        </div>
      </div>
        <div className="donation-container">
          <div className="donation-contents">
            <div className="d-flex flex-row mt-5">
              <div className="col-4 d-flex justify-content-center">
                <div className="d-flex flex-row align-items-center justify-content-around dashboard-card border-red">
                  <div>
                    <h2>Total Donations</h2>
                    <p style={{ fontSize: '30px', fontWeight: 'bold'}}>{donations.length}</p>
                  </div>
                  <div>
                    <BsFillHeartFill className='dashboard-icon' style={{ color: 'rgba(196, 65, 69, 1)'}}/>
                  </div>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <div className="d-flex flex-row justify-content-around align-items-center dashboard-card border-green">
                  <div>
                    <h2>Total Raised</h2>
                    <p style={{ fontSize: '30px', fontWeight: 'bold'}}>VND {Intl.NumberFormat('en-US').format(totalRaised)}</p>
                  </div>
                  <div>
                    <BsFillWalletFill className='dashboard-icon' style={{ color: 'rgba(80, 173, 122, 1)'}}/>
                  </div>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <div className="d-flex flex-row justify-content-around align-items-center dashboard-card border-yellow">
                  <div>
                    <h2>Donors</h2>
                    <p style={{ fontSize: '30px', fontWeight: 'bold'}}>{totalDonors}</p>
                  </div>
                  <div>
                    <BsFillPeopleFill className='dashboard-icon' style={{ color: 'rgba(244, 181, 86, 1)'}}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-2 border table-responsive-md table-responsive-sm table-responsive-xs">
              <table className='table'>
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
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <div className="table-pagination">
                        <Pagination results={donations.length} page={page} setPage={setPage} count={count} />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default Donations