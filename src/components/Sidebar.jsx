import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import FireLogo from '../assets/img/fire.png';
import UserAvatar from '../assets/img/user-avt.png'
import { BsFillGrid1X2Fill, BsFillHeartFill, BsFillPeopleFill, BsFillPlusSquareFill, BsArrowRightSquare, BsFillWalletFill } from 'react-icons/bs';

const Sidebar = () => {
  const [signedIn, setSignedIn] = useState(localStorage.getItem('token') ? true : false);
  const navigate = useNavigate();

  // Sign out
  const handleSignout = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  }

  //Sign in
  const handleSignin = () => {
    navigate('/sign-in');
  }

  const menu = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <BsFillGrid1X2Fill />
    },
    {
      path: '/charities',
      name: 'Charities',
      icon: <BsFillHeartFill />
    },
    {
      path: '/donations',
      name: 'Donations',
      icon: <BsFillWalletFill />
    },
    {
      path: '/new-charity',
      name: 'New Charity',
      icon: <BsFillPlusSquareFill />
    },
    {
      path: '/users',
      name: 'Users',
      icon: <BsFillPeopleFill />
    }
  ]

  return (
    <div className="sidebarContainer">
      <div className="d-flex flex-row justify-content-center">
        <img src={FireLogo} alt="fire-logo" width='60px' height='60px' className='logo'/>
        <p className='brand mt-3'>Fire Admin</p>
      </div>
      <div className='d-flex flex-column lower-section'>
        <div className="userInfo">
          <img src={UserAvatar} alt='user avatar' className='userAvatar'/>
          <p>Aidan</p>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-start mt-5' style={{ height: 'auto' }}>
        {menu && menu.map((item, i) => (
          <Nav.Link href={item.path} key={i} className='d-flex flex-row align-items-center justify-content-start link'>
            <div className='icon'>{item.icon}</div>
            <div>
              <p className='mx-3 mt-3'>{item.name}</p>
            </div>
          </Nav.Link>
        ))}
        </div>
        {signedIn ?
        <div className="exit" onClick={handleSignout}>
          <button className='exit-button'>Sign Out</button>
          <BsArrowRightSquare className='exit-icon' />
        </div> :
        <div className="exit" onClick={handleSignin}>
          <button className='exit-button'>Sign In</button>
          <BsArrowRightSquare className='exit-icon' />
        </div>}
      </div>
    </div>
  )
}

export default Sidebar
