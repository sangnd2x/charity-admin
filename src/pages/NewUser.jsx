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
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = () => {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('email', email);
    data.append('role', role);

    const postNewUser = async () => {
      try {
        const response = await axiosReq.post('/admin/users/new-user', data);
        console.log(response.data);
        if (response.status === 200) {
          toast.success(response.data.msg, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate('/users');
          }, 1500);
        }
      } catch (error) {
        console.log(error);
        toast.success(error.data.msg, {
          position: "top-right",
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

    postNewUser();
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
              type="text"
              placeholder="Username"
              name='username'
              onChange={(e) => setUsername(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Password"
              name='password'
              onChange={(e) => setPassword(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Email"
              name='email'
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select Role</Form.Label>
            <Form.Select aria-label="Default select example" name='role' 
              defaultValue="default"
              onChange={(e) => setRole(e.target.value)}
              style={{height: '50px'}}
            >
            <option value="default" disabled>Select role</option>
            <option value="admin">Admin</option>
            <option value="donor">Donor</option>
          </Form.Select>
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