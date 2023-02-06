import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosReq from './api/axios';
import ProgressBar from './ProgressBar';
import { BsPencilSquare, BsXLg } from 'react-icons/bs';

const CharityCard = ({ charities, isTouched, setIsTouched, startIndex, endIndex, donated }) => {
  const navigate = useNavigate();
  
  const results = charities.slice(startIndex, endIndex);
  // console.log(results);
  const handleEdit = (id) => {
    const charityId = id;
    navigate(`/edit-charity/${charityId}`, { state: { charityId } });
  };

  const handleDelete = async (id) => {
    const response = await axiosReq.get(`/admin/delete-charity/${id}`);
    console.log(response);
    if (response.status === 200) {
      setIsTouched(!isTouched);
    } else {
      return;
    }
  };

  return (
    <div className="charities-container row px-3">
      {results && results.map(charity => (
        <div className="col-xl-6 col-md-6 col-sm-12 d-flex justify-content-center" key={charity._id}>
          <div className="card">
            <div className="card-body" style={{ margin: '1px' }}>
              <div className="card-title d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column">
                  <h4>{charity.name}</h4>
                  {
                    charity.status === 'upcoming' ? <h6 className="yellow">{charity.status}</h6> :
                    charity.status === 'ongoing' ? <h6 className="pearl">{charity.status}</h6> :
                    <h6 className="red">{charity.status}</h6>
                  }
                </div>
                <div>
                  <BsPencilSquare style={{ cursor: 'pointer' }} onClick={() => handleEdit(charity._id)} className='card-icons' />
                  <BsXLg style={{ cursor: 'pointer' }} onClick={() => handleDelete(charity._id)} className='card-icons' />
                </div>
              </div>
              <div className="card-text">{charity.short_desc}</div>
              <div className="card-img d-flex flex-row justify-content-center" >
                <img src={charity.images[0]} alt="charity1" style={{ width: '33rem', height: '5rem' }} />
              </div>
              <div className="card-text">
                <ProgressBar bgcolor={`rgba(229, 124, 102, 1)`} completed={donated.filter(donate => donate.charityName === charity.name)[0].progress}/>
              </div>
              <div className="date">
                <p>{new Date(charity.startDate).toLocaleDateString('en-GB')}</p>
                <p>{new Date(charity.endDate).toLocaleDateString('en-GB')}</p>
              </div>
              <div className="target">
                <p>Current: {donated.map(donate => {
                  if (donate.charityName === charity.name) {
                    return Intl.NumberFormat('en-US').format(donate.donated);
                  }
                })} VND</p>
                <p>Target: {Intl.NumberFormat('en-US').format(charity.target)} VND</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharityCard
