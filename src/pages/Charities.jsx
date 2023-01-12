import React from 'react'
// import { Container } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Card from '../components/CharityCard';
import Pagination from '../components/Pagination';
import { Dropdown } from 'react-bootstrap';

const Charities = () => {
  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
      <div>
        <Sidebar />
      </div>
      <div className='container'>
        <div className="top-section">
          <div className="title">
            <h3>Charities</h3>
            <input type="text" placeholder='Search' className='searchBar'/> 
          </div>
          <div className="nav">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className='dropdown-button'>
                Aidan
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="charities-container row">
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <Card />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <Card />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <Card />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <Card />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <Card />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <Card />
          </div>
        </div>
        <div className='d-flex justify-content-end mx-5'>
          <Pagination page={`1 of 8`} />
        </div>
      </div>
    </div>
  )
}

export default Charities
