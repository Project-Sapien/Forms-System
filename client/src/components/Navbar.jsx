import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
      <div className="flex p-3 justify-evenly">
          <button className="regionA p-1 rounded bg-green-400" onClick={()=>{navigate("/A")}}>Region A</button>
          <button className="regionB p-1 rounded bg-green-400" onClick={()=>{navigate("/B")}}>Region B</button>
          <button className="regionC p-1 rounded bg-green-400" onClick={()=>{navigate("/C")}}>Region C</button>
    </div>
  )
}

export default Navbar