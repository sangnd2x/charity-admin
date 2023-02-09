import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import Logo from '../assets/img/logo.png';
import MaleAvatar from '../assets/img/male-avt.svg'
import { BsFillGrid1X2Fill, BsFillHeartFill, BsFillPeopleFill, BsFillPlusSquareFill, BsArrowRightSquare, BsFillWalletFill } from 'react-icons/bs';

const Sidebar = () => {
  const path = window.location.pathname;
  // console.log(path);

  const [signedIn, setSignedIn] = useState(sessionStorage.getItem('token') ? true : false);
  const navigate = useNavigate();

  // Sign out
  const handleSignout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
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
      <div className="d-flex flex-row justify-content-center mt-4 mx-auto logo">
        <img src={Logo} alt="fire-logo" width={40} height={40}/>
        <p className='logo-text mx-2 mt-2'>THE GIVING CIRCLE</p>
      </div>
      <hr className="line" />
      <div className='d-flex flex-column justify-content-between lower-section'>
        {/* <div className="userInfo">
          <img src={MaleAvatar} alt='user avatar' className='userAvatar'/>
          <p>Aidan</p>
        </div> */}
        <div className='' style={{ height: 'auto' }}>
        {menu && menu.map((item, i) => (
          <Nav.Link href={item.path} key={i} className={`${path === item.path ? 'active' : ''}`}> 
            <div className='d-flex align-items-center ms-5 '>
              <span className=''>{item.icon}</span>
              <span className='ms-2'>{item.name}</span>
            </div>
          </Nav.Link>
        ))}
        </div>
        <div>
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
    </div>
  )
}

export default Sidebar
