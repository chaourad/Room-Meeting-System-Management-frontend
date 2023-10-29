import React from 'react'
import FloorPagination from '../../components/Floorcomp/FloorPagination'
import { IoAddSharp } from "react-icons/io5";
function Floor() {
  return (
    <div>
      <div className='mx-40 mt-8'>
      <button type="button" className="text-white bg-[#111827] dark:bg-[#111827] cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center flex flex-row items-center" disabled><IoAddSharp size={20}/>  Add Floor</button>
      </div>
      <FloorPagination/>
    </div>
  )
}

export default Floor