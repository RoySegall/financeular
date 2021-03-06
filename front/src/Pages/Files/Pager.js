import {Next, Prev} from "../../Components/Icons/Icons";
import React from "react";

export default ({borderColor, currentPage, setCurrentPage, numberOfPages}) => <ul className="flex float-right pager">
  <li className={`p-2 border border-${borderColor}-400 bg-${borderColor}-50 text-${borderColor}-700 border-r-0 rounded-l-lg`}>
    <button className="prev-button" onClick={() => {currentPage > 0 && setCurrentPage(currentPage - 1)}}><Prev /></button>
  </li>

  {[...Array(numberOfPages)].map((_, i) => <li key={i} className={`p-2 border border-${borderColor}-400 bg-${borderColor}-50  border-r-0 cursor-pointer`}>
    <button onClick={() => setCurrentPage(i)} className={i === currentPage ? 'font-semibold text-black' : `text-${borderColor}-700`}>{i + 1}</button>
  </li>)}

  <li className={`p-2 border border-${borderColor}-400 bg-${borderColor}-50 text-${borderColor}-700 rounded-r-lg`}>
    <button className="next-button" onClick={() => {currentPage + 1 < numberOfPages && setCurrentPage(currentPage + 1)}}><Next /></button>
  </li>
</ul>
