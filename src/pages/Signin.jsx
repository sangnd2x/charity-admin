import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosReq from '../components/api/axios';
import { Form, Button } from 'react-bootstrap'

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
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      } else {
        return
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  const handleSignup = () => {
    navigate('/sign-up');
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ height: '100vh'}}>
        <div className='col-xl-4 p-5 sign-card'>
          <h1 className='mb-4'>Charities</h1>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Username" name='username' 
            onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Password" name='password' 
            onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='sign-button' onClick={handleSubmit}>Sign In</Button>
          <p className='create-account'>Don't have an account? <span className='signup' onClick={handleSignup}>Sign up</span></p>
        </div>
      </div>
    </div>
  )
}

export default Signin
