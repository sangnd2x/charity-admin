import React from 'react'
import { BsCaretRight, BsCaretLeft } from 'react-icons/bs';

const Pagination = (props) => {
  return (
    <div className='pagination'>
      <BsCaretLeft />
      {props.page}
      <BsCaretRight />
    </div>
  )
}

export default Pagination
