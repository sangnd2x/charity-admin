import { useState, useEffect } from 'react';
import axiosReq from '../components/api/axios';
import Sidebar from '../components/Sidebar';
import CharityCard from '../components/CharityCard';
import Pagination from '../components/Pagination';

const Charities = () => {
  const [charities, setCharities] = useState([]);
  const [donated, setDonated] = useState([]);
  const [isTouched, setIsTouched] = useState(false);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(6);
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
        setCharities(response.data.charities);
        setDonated(response.data.donated);
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
        <div className="m-4">
          <div className="d-flex mt-4 justify-content-between align-items-start">
            <h3>Charities</h3>
            <input
              type="text"
              placeholder="Search Charity's name"
              className='searchBar'
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>
        <div className="row mt-5">
          <CharityCard
            charities={charities}
            donated={donated}
            isTouched={isTouched}
            setIsTouched={setIsTouched}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        </div>
        <div className='d-flex justify-content-end mx-5'>
            <Pagination results={charities.length} page={page} setPage={setPage} count={count} />
          </div>
      </div>
    </div>
  )
}

export default Charities
