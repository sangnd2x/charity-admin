import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosReq from './api/axios';
import ProgressBar from './ProgressBar';
import { BsPencilSquare, BsXLg } from 'react-icons/bs';

const CharityCard = ({ charities, isTouched, setIsTouched, startIndex, endIndex, donated }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  console.log(donated);
  const results = charities.slice(startIndex, endIndex);
  // console.log(results);
  const handleEdit = (id) => {
    const charityId = id;
    navigate(`/edit-charity/${charityId}`, { state: { charityId } });
  };

  const handleDelete = async (status, id) => {
    setStatus(status);
    const data = new FormData();
    data.append('status', status);
    data.append('charityId', id);
    const response = await axiosReq.post(`/admin/delete-charity`, data);
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
        <div className="col-xl-4 col-md-4 col-sm-12 d-flex justify-content-center" key={charity._id}>
          <div className={`card ${charity.status === 'ongoing' ? 'border-green' : charity.status === 'upcoming' ? 'border-yellow' : 'border-red'}`}>
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
                
              </div>
              <div className="card-text">{charity.short_desc}</div>
              <div className="card-img d-flex flex-row justify-content-center" >
                <img src={charity.images[0]} alt="charity1" style={{ width: '33rem', height: '5rem' }} />
              </div>
              <div className="card-text">
                <ProgressBar
                  bgcolor={`rgba(229, 124, 102, 1)`}
                  completed={donated.filter(donate => donate.charityName === charity.name)[0].progress}
                  // completed={`80`}
                />
              </div>
              <div className="date">
                <p className='card-span'>{new Date(charity.startDate).toLocaleDateString('en-GB')}</p>
                <p className='card-span'>{new Date(charity.endDate).toLocaleDateString('en-GB')}</p>
              </div>
              <div className="target d-flex flex-column">
                <p><span className='card-span'>Raised:</span> {donated.map(donate => {
                  if (donate.charityName === charity.name) {
                    return Intl.NumberFormat('en-US').format(donate.donatedAmount);
                  }
                })} VND</p>
                <p><span className='card-span'>Goal:</span> {Intl.NumberFormat('en-US').format(charity.target)} VND</p>
              </div>
              <div className='d-flex justify-content-around'>
                <button
                  type='button'
                  className='card-button mb-1'
                  onClick={() => handleEdit(charity._id)}
                >
                  Edit
                </button>
                <select
                  className={`${charity.status === 'ongoing' ? 'buttonBorder-green' : charity.status === 'upcoming' ? 'buttonBorder-yellow' : 'buttonBorder-red'}`}
                  defaultValue={charity.status}
                  onChange={(e) => {
                    const confirm = window.confirm('Are you sure you want to change the status of this charity?');
                    if (confirm) {
                      handleDelete(e.target.value, charity._id)
                    }
                  }}
                >
                  <option value="ongoing">On-going</option>
                  <option value="upcoming">Up-coming</option>
                  <option value="stopped">Stopped</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharityCard
