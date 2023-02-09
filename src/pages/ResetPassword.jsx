import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosReq from '../components/api/axios';
import { Form, Button } from 'react-bootstrap';
import Logo from '../assets/img/logo.png';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const userId = window.location.pathname.substring(1).split('/')[2];
  // console.log(userId);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('newPass', newPass);
    data.append('confirmNewPass', confirmNewPass);
    data.append('userId', userId);

    try {
      const response = await axiosReq.post('/admin/user/reset-password', data);
      console.log(response.data);
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

        setTimeout(() => {
          navigate('/sign-in')
        }, 1500);
      } else {
        return
      }
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
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ height: '100vh'}}>
        <div className='col-xl-4 p-5 sign-card'>
          <div className='d-flex flex-row justify-content-center my-3'>
            <img src={Logo} alt="logo" width={60}/>
            <h1 className='mx-3'>THE GIVING CIRCLE</h1>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="New Password" name='newPass' 
            onChange={(e) => setNewPass(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm New Password" name='confirNewPass' 
            onChange={(e) => setConfirmNewPass(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='sign-button' onClick={handleSubmit}>Reset Password</Button>
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
    </div>
  )
};

export default ResetPassword;