import React from 'react'

export default function RoomPaginator({currentPage,totalPages,onPageChange}) {
    const pageNumber=Array.from({length:totalPages},(_,i)=>i+1)
  return (
    <>
      <nav aria-label='Page navigation'>
        <ul className='pagination justify-content-centre'>
            {pageNumber.map((item)=>{
                return ( <li key={item} className={`page-item ${currentPage===item ? "active":""}`}>
                           <button className='page-link' onClick={()=>onPageChange(item)}>{item}</button>
                          </li>)
            })}
        </ul>
      </nav>
    </>
  )
}
