import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavComp = () => {
  return (
    <Navbar style={{ backgroundColor: 'whitesmoke', height: '45px', width: '100vw', justifyContent: 'right', position: 'relative'}} expand='lg' sticky='top'>
      <Nav>
        <NavDropdown title='User' className='me-4'>
          <NavDropdown.Item>Info</NavDropdown.Item>
          <NavDropdown.Item>Log Out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
}

export default NavComp
