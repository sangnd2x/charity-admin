import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import axiosReq from '../components/api/axios';

const EditPassword = () => {
  const navigate = useNavigate();
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('userId', userId)
    data.append('oldPass', oldPass);
    data.append('newPass', newPass);
    data.append('confirmNewPass', confirmNewPass);

    try {
      const response = await axiosReq.post('/edit-password', data);
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        return
      }

      setTimeout(() => {
        navigate('/dashboard');
      }, 2500);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 1500,
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
            <h3>Change Password</h3>
          </div>
        </div>
        <div className='changePassword-container'>
          <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Old Password"
              name='old password'
              onChange={(e) => setOldPass(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Pasword</Form.Label>
            <Form.Control 
              type="password"
              placeholder="New Pasword"
              name='new pasword'
              onChange={(e) => setNewPass(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Confirm New Password"
              name='confirm new password'
              onChange={(e) => setConfirmNewPass(e.target.value)} 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='sign-button' onClick={handleSubmit}>Change</Button>
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

export default EditPassword