import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosReq from '../components/api/axios';
import Logo from '../assets/img/logo.png';
import Welcome from '../assets/img/welcome.png';

const Verified = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  const userId = window.location.pathname.substring(1).split('/')[1];
  const [user, setUser] = useState({});
  console.log(userId);
  useEffect(() => {
    const verify = async () => {
      const response = await axiosReq.get(`/new-user/${userId}`);
      // console.log(response.data);
      setUser(response.data);
    }

    verify();

    setTimeout(() => {
      navigate('/sign-in');
    }, 4900);
  }, []);

  useEffect(() => {
    if (!user) return
    if (count <= 1) return
    for (let i = 5; i >= 1; i--) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000)
    }
  }, [count]);

  const redirect = () => {
    navigate('/sign-in');
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center my-4">
        <img src={Logo} alt="logo"  width={100}/>
        <h1>THE GIVING CIRLE</h1>
      </div>
      <div className='container mt-5 d-flex flex-column align-items-center justify-content-center'>
        <h1>Thank you for becoming a part of The Giving Circle Community.</h1>
        <p style={{ fontStyle: 'italic' }}>You will be redirected shortly in {count} second. If the browser does not redirect automatically, <span onClick={redirect} style={{ fontWeight: '600'}}>click here</span></p>
        <img src={Welcome} alt="welcome" />
      </div>
    </div>
  )
}

export default Verified