import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosReq from '../components/api/axios';
import { Form, Button } from 'react-bootstrap';
import Logo from '../assets/img/logo.png';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('username', username);
    data.append('email', email);

    try {
      const response = await axiosReq.post('/admin/user/forget-password', data);
      // console.log(response.data);
      if (response.status === 200) {
        toast.success('Please check your email to reset password', {
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

    // navigate('/user/reset-password');
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
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" name='username' 
            onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" name='email' 
            onChange={(e) => setEmail(e.target.value)}
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
}

export default ForgetPassword