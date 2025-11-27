import React from 'react' 
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
    const location = useLocation()
    const user = location.state
  return (
    <div>Details of {user.name}</div>

  )
}

export default Details