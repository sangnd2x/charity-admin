import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosReq from '../components/api/axios';
import Sidebar from '../components/Sidebar';
import { Table } from 'react-bootstrap';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [clicked, setClicked] = useState(false);

  // Search
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  // Fetch all users
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
  }, [searched, clicked]);

  // Search user
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

  // Navigate to edit info page
  const handleEdit = (userId) => {
    navigate(`/user/edit-info/${userId}`);
  }

  // Deactivate a user whose role is not admin
  const handleDeactivate = async (userId) => {
    setClicked(true);
    try {
      const response = await axiosReq.get(`/admin/user/deactivate/${userId}`);
      console.log(response);
      setClicked(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Change role of a user whose role is not admin
  const handleChangeRole = async (newRole, userId) => {
    setClicked(true);
    const data = new FormData();
    data.append('userId', userId);
    data.append('newRole', newRole);
    try {
      const response = await axiosReq.post(`/admin/user/edit-info/`, data);
      console.log(response);
      setClicked(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
    <div>
      <Sidebar />
    </div>
    <div className='container'>
      <div className="m-2">
        <div className="d-flex mt-4 justify-content-between align-items-start">
          <h3>Users</h3>
            <input
              type="text"
              placeholder="Search User's name"
              className='searchBar'
              onChange={(e) => handleSearch(e)}
            /> 
        </div>
      </div>
      <div className="mt-5 border">
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registerd At</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user => (
              <tr key={user._id}
                style={{ backgroundColor: `${user.status === 'active' ? 'rgba(80, 173, 122, 0.2)' : 'rgba(196, 65, 69, 0.3)'}` }}
              >
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {/* if the user is not admin, allow to change role */}
                  {user.role !== 'admin' ?
                    <select
                      defaultValue={user.role}
                      style={{ border: '1px solid transparent', borderRadius: '5px', backgroundColor: 'transparent' }}
                      onChange={(e) => {
                        const confirm = window.confirm('Are you sure you want to change the role of this user?');
                          if (confirm) {
                            handleChangeRole(e.target.value, user._id)
                          }
                      }}
                    >
                      <option value="admin">Admin</option>
                      <option value="donor">Donor</option>
                    </select> : 
                    <select
                    defaultValue={user.role}
                    style={{ border: '1px solid transparent', borderRadius: '5px', backgroundColor: 'transparent' }}
                    disabled
                  >
                    <option value="admin">Admin</option>
                    <option value="donor">Donor</option>
                  </select>}
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString('en-GB')}</td>
                {user.status === 'active' ?
                  <td><span style={{ color: 'rgba(80, 173, 122, 1)', fontWeight: 'bold'}}>{user.status}</span></td> :
                  <td><span style={{ color: 'rgba(196, 65, 69, 1)', fontWeight: 'bold' }}>{user.status}</span></td>}
                <td>
                  <button
                    type='button'
                    className='editUser-button'
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit
                  </button>
                  {user.role !== 'admin' ?
                    // If user is not admin, show deactivate button
                    <button
                      type='button'
                      className='deleteUser-button'
                      onClick={() => {
                        const confirm = window.confirm('Are you sure you want to deactivate this user?');
                        if (confirm) {
                          handleDeactivate(user._id)
                        }
                      }}
                    >
                      Deactivate
                    </button> : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default Users
