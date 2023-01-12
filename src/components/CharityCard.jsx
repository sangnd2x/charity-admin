import React from 'react'
import Charity1 from '../assets/img/charity1.jpeg';
import ProgressBar from './ProgressBar';
import { BsBrushFill } from 'react-icons/bs';

const CharityCard = () => {
  const cardClick = () => {
    console.log('clicked');
  }

  return (
    <div className="card" style={{ width: '28rem', height: 'auto' }} onClick={cardClick}>
      <div className="card-body" style={{ margin: '3px' }}>
        <div className="card-title d-flex align-items-center justify-content-between">
          <h4>Charity 1</h4>
          <BsBrushFill style={{ cursor: 'pointer'}}/>
        </div>
        <div className="card-text">Lorem ipsum dolor sit amet.</div>
        <div className="card-img d-flex flex-row justify-content-center" >
          <img src={Charity1} alt="charity1" style={{ width: '19rem', height: '5rem'}}/>
        </div>
        <div className="card-text">
          <ProgressBar bgcolor={`RGBA(196, 103, 77, 1.00)`} completed={80} />
        </div>
        <div className="date">
          <p>StartDate</p>
          <p>EndDate</p>
        </div>
        <div className="target">
          <p>Current: $160.000</p>
          <p>Target: $200.000</p>
        </div>
      </div>
    </div>
  )
}

export default CharityCard
