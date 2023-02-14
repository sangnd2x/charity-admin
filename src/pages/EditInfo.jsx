import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import axiosReq from '../components/api/axios';

const EditInfo = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  const [user, setUser] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newStatus, setNewStatus] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [newAvatar, setNewAvatar] = useState([]);
  console.log(newStatus);

  // Fetch selected user's info
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosReq.get(`/admin/users/${userId}`);
      console.log(response.data)
      setUser(response.data);
    }

    fetchUser();
  }, []);

  // Submit the changes to server
  const handleSubmit = async () => {
    const data = new FormData();
    data.append('userId', userId);
    data.append('newUsername', newUsername);
    data.append('newEmail', newEmail);
    data.append('newStatus', newStatus);
    data.append('newRole', newRole);
    for (let i = 0; i <= newAvatar.length; i++){
      data.append('newAvatar', newAvatar[i]);
    }

    try {
      const response = await axiosReq.post('admin/user/edit-info', data);
      if (response.status === 200) {
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        return;
      }

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error(error.data.msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  
  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
      <div>
        <Sidebar />
      </div>
      <div className='container'>
        <div className="m-4">
          <div className="d-flex mt-4 justify-content-between align-items-start">
            <h3>Edit Info</h3>
          </div>
        </div>
        <div className='changePassword-container'>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Username"
              name='username'
              defaultValue={user.username}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Email"
              name='email'
              defaultValue={user.email}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select 
              type="text"
              name='status'
              defaultValue={user.status}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value='default' disabled>Select Status</option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="d-flex justify-content-between px-1">
              <Form.Label>Select Images</Form.Label>
              {/* <Form.Text className='error-msg'>{errors.images}</Form.Text> */}
            </div>
            <Form.Control type="file" name='images' multiple
              onChange={(e) => setNewAvatar(e.target.files)} 
              // onBlur={() => setImagesTouched(true)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='sign-button' onClick={handleSubmit}>Update</Button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light">
      </ToastContainer>
    </div>
  )
}

export default EditInfo