import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosReq from '../components/api/axios';
import { Form, Button } from 'react-bootstrap'

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);

    try {
      const response = await axiosReq.post('/admin/sign-up', formData);
      console.log(response);
      // navigate to sign in after sign up successfully
      if (response.status === 200) {
        navigate('/sign-in');
      } else {
        return
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  }


  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ height: '100vh'}}>
        <div className='col-xl-4 p-5 sign-card'>
          <h1 className='mb-4'>Charities</h1>
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
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' 
            onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='sign-button' onClick={handleSubmit}>Sign Up</Button>
        </div>
      </div>
    </div>
  )
}

export default Signup;
