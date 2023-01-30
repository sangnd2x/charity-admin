import React from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CharityCard from '../components/CharityCard';
import Pagination from '../components/Pagination';

const Charities = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/edit-charity');
  }

  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
      <div>
        <Sidebar />
      </div>
      <div className='container'>
        <div className="top-section p-3">
          <div className="title">
            <h3>Charities</h3>
            <input type="text" placeholder='Search' className='searchBar'/> 
          </div>
          <div className='d-flex justify-content-end mx-5'>
            <Pagination page={`1 of 8`} />
          </div>
        </div>
        <div className="charities-container row px-3">
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <CharityCard />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <CharityCard />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <CharityCard />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <CharityCard />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <CharityCard />
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center">
            <CharityCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charities
