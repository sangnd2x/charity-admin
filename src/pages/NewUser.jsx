import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axiosReq from '../components/api/axios';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import { Form, Button } from 'react-bootstrap';

const NewUser = () => {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(sessionStorage.getItem('token') ? true : false);
  const [username, setUsername] = useState('');
  const [charityName, setCharityName] = useState('')

  const handleSubmit = () => {

  }
  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
      <div>
        <Sidebar />
      </div>
      <div className='container'>
        <div className="m-4">
          <div className="d-flex mt-4 justify-content-between align-items-start">
            <h3>New User</h3>
          </div>
        </div>
        <div className='changePassword-container'>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Username"
              name='username'
              // onChange={(e) => setOldPass(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Password"
              name='password'
              // onChange={(e) => setNewPass(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Confirm New Password"
              name='confirm new password'
              // onChange={(e) => setConfirmNewPass(e.target.value)} 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='sign-button' onClick={handleSubmit}>Add New User</Button>
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

export default NewUser