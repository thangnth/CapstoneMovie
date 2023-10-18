import React, {useState, useEffect} from 'react';
import Cinemas from './Cinemas'

export default function Systems({ systems}) {
  const [id, setId] = useState(systems[0].maHeThongRap)
  const handleSelectSystem = (selectedId)=>{
    setId(selectedId)
  }

  return (
    <>
      <div className='systems col-lg-1 mb-5'>
       {systems.map((system)=>{
      return (
        <img className='system mb-lg-5 me-1' src={system.logo} alt={system.maHeThongRap} key={system.maHeThongRap}  width={50} height={50} onClick={()=>{handleSelectSystem(system.maHeThongRap)}}/>
     )
       })}
      </div>
      <Cinemas systems = {systems} id={id} onSelectSystem = {(selectedId)=>{handleSelectSystem(selectedId)}}/>
    </>

  )
}
