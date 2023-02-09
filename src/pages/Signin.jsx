import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosReq from '../components/api/axios';
import { Form, Button } from 'react-bootstrap'
import Logo from '../assets/img/logo.png';

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axiosReq.post('/admin/sign-in', formData);
      // navigate to sign in after sign up successfully
      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.accessToken);
        sessionStorage.setItem('userId', response.data.user);
        toast.success('Signed In', {
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
          navigate('/dashboard');
        }, 1500);
      } else {
        return
      }
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg, {
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

  const handleSignup = () => {
    navigate('/sign-up');
  }

  const handleForget = () => {
    navigate('/user/forget-password');
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ height: '100vh'}}>
        <div className='col-xl-4 p-5 sign-card'>
          <div className='d-flex flex-row justify-content-center my-3'>
            <img src={Logo} alt="logo" width={60}/>
            <h1 className='mx-3'>THE GIVING CIRCLE</h1>
          </div>
          <Form.Group className="mt-5">
            <Form.Control
              type="text"
              placeholder="Username"
              name='username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-1">
            <Form.Control
              type="password"
              placeholder="Password"
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            className='sign-button'
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <p>Don't have an account? <span className='signup' onClick={handleSignup}>Sign up</span></p>
          <p><span className='signup' onClick={handleForget}>Forget Password?</span></p>
          <ToastContainer
            position="top-right"
            autoClose={1000}
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
    </div>
  )
}

export default Signin
