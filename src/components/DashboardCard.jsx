import React from 'react'
import { BsFillWalletFill, BsFillHeartFill } from 'react-icons/bs';

const DashboardCard = () => {
  return (
    <div className="card d-flex flex-row justify-content-around align-items-center" style={{ width: '28rem', height: 'auto' }} >
      <div className="card-body" style={{ margin: '3px' }}>
        <div className="card-title">
          <h2>Charity 1</h2>
        </div>
        <div className="card-text">
          <p>On-going: 20</p>
          <p>Up-coming: 12</p>
        </div>
      </div>
      <div>
        <BsFillHeartFill style={{ width: '80px', height: '80px', marginRight: '20px'}}/>
      </div>
    </div>
  )
}

export default DashboardCard
