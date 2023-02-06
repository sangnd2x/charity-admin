import { useState, useEffect } from 'react';
import axiosReq from '../components/api/axios';
import Sidebar from '../components/Sidebar';
import { Table } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);

  // Search
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosReq('/admin/users');
      if (response.status === 200) {
        // console.log(response.data);
        setUsers(response.data)
      } else {
        return;
      }
    }

    fetchUsers();
  }, [searched]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (query) {
      setSearched(true);
    } else {
      setSearched(false);
    }

    const fetchSearchedUser = async () => {
      const response = await axiosReq.get(`/admin/search/user/${query}`);
      // console.log(response);
      if (response.status === 200) {
        setUsers(response.data);
      }
    }

    fetchSearchedUser();
  }

  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
    <div>
      <Sidebar />
    </div>
    <div className='container'>
      <div className="top-section p-3">
        <div className="title">
          <h3>Users</h3>
            <input type="text" placeholder='Search' className='searchBar'
            onChange={(e) => handleSearch(e)}/> 
        </div>
      </div>
      <div className="newCharity-container row px-5">
      <Table striped hover className='dashboard-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registerd At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString('en-GB')}</td>
                {user.status === 'active' ?
                  <td><span style={{ color: 'rgba(109, 188, 166, 1)', fontWeight: 'bold'}}>{user.status}</span></td> :
                  <td><span style={{ color: 'rgba(229, 124, 102, 1)', fontWeight: 'bold'}}>{user.status}</span></td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  </div>
  )
}

export default Users
