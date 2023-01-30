import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    navigate('/dashboard');
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
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" name='username' 
            onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" placeholder="Password" name='password' 
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
