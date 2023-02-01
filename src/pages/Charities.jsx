import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosReq from '../components/api/axios';
import Sidebar from '../components/Sidebar';
import CharityCard from '../components/CharityCard';
import Pagination from '../components/Pagination';
import { Button } from 'react-bootstrap';

const Charities = () => {
  const navigate = useNavigate();
  const [charities, setCharities] = useState([]);
  const [isTouched, setIsTouched] = useState(false);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(4);
  const startIndex = (page - 1) * count;
  const endIndex = page * count;

  // Search
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const getCharities = async () => {
      const response = await axiosReq.get('/admin/charities');
      // console.log(response);
      if (response.status === 200) {
        setCharities(response.data);
      } else {
        return;
      }
    }

    getCharities();
  }, [isTouched, searched]);
  // console.log(isTouched);
  // console.log(charities);
  // console.log(page);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (query) {
      setSearched(true);
    } else {
      setSearched(false);
    }

    const fetchSearchedCharity = async () => {
      const response = await axiosReq.get(`/admin/search/charity/${query}`);
      console.log(response);
      setCharities(response.data);
    }

    fetchSearchedCharity();
  }

  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
      <div>
        <Sidebar />
      </div>
      <div className='container'>
        <div className="top-section p-1 px-4">
          <div className="title">
            <h3>Charities</h3>
            <input type="text" placeholder='Search' className='searchBar'
              onChange={(e) => handleSearch(e)} />
          </div>
          <div className='d-flex justify-content-end mx-5'>
            <Pagination results={charities.length} page={page} setPage={setPage} count={count} />
          </div>
        </div>
        <div className="row">
          <CharityCard charities={charities}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
            startIndex={startIndex}
            endIndex={endIndex} />
        </div>
      </div>
    </div>
  )
}

export default Charities
