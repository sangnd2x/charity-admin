import { useState } from 'react';
import { BsCaretRight, BsCaretLeft } from 'react-icons/bs';

const Pagination = ({ results, page, setPage, count }) => {
  const totalPage = Math.ceil(results / count);
  const nextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    } else {
      setPage(1)
    }
      
  }

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(totalPage);
    }
  }

  // console.log(page);
  return (
    <div className='pagination'>
      <BsCaretLeft onClick={() => prevPage(page)}/>
      {page} of {totalPage}
      <BsCaretRight onClick={() => nextPage(page)}/>
    </div>
  )
}

export default Pagination
