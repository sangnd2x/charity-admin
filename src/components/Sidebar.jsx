import { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap'
import FireLogo from '../assets/img/fire.png';
import UserAvatar from '../assets/img/user-avt.png'
import { BsFillGrid1X2Fill, BsFillHeartFill, BsFillPeopleFill, BsFillPlusSquareFill, BsArrowRightSquare, BsFillWalletFill } from 'react-icons/bs';

const Sidebar = () => {
  const isShow = JSON.parse(localStorage.getItem('openSidebar'));
  
  // console.log(isShow)
  const [show, setShow] = useState(isShow? isShow: false);
  
  useEffect(() => {
    localStorage.setItem('openSidebar', JSON.stringify(show));
  }, [show])

  const toggleOn = () => {
    setShow(true);
    // console.log(show);
  };

  const toggleOff = () => {
    setShow(false);
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
    <div className="sidebarContainer" style={{ width: show ? '200px' : '50px'}} onMouseOver={toggleOn} onMouseOut={toggleOff}>
      <div className="d-flex flex-row justify-content-center">
        <img src={FireLogo} alt="fire-logo" width='60px' height='60px' className='logo'/>
        <p style={{ display: show? 'block' : 'none' }} className='brand mt-3'>Fire Admin</p>
      </div>
      <div className="d-flex flex-column lower-section">
        <div className="userInfo">
          <img src={UserAvatar} alt="user avatar" className="userAvatar" style={{ width: show? '80px' : '30px'}} />
          <p>Aidan</p>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-start mt-5' style={{ height: 'auto', marginLeft: show ? '0px' : '0px' }}>
        {menu && menu.map((item, i) => (
          <Nav.Link href={item.path} key={i} className='d-flex flex-row align-items-center justify-content-start link'>
            <div className='icon' style={{ marginLeft: show? '30px' : '15px'}}>{item.icon}</div>
            <div>
              <p className='mx-3 mt-3' style={{ display: show ? 'block' : 'none' }}>{item.name}</p>
            </div>
          </Nav.Link>
        ))}
        </div>
        <div className="exit">
          <button className='exit-button' style={{display: show? 'inline-block' : 'none'}}>Exit</button>
          <BsArrowRightSquare className='exit-icon' style={{ marginLeft: show? '10px' : '0px'}}/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
