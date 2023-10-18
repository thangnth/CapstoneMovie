import React, {useState, useEffect} from 'react'
import Systems from './Systems/Systems'
import { useQuery } from '@tanstack/react-query';
import { getSystems} from '../../../apis/cinemaAPI'



export default function Cinema() {
    const {
      data: systems = [],
      isLoading,
      error,
    } = useQuery({ queryKey: ["systems"], queryFn: getSystems});
    useEffect(()=>{},[])
   
  
    if (isLoading) {
      return (
        <h1>Loading...</h1>
      )
    }
    if(error){
      return (<h1>{error}</h1>)
    } 
  
  return (
    <div id="systems-cinemas-showtimes"className="systems-cinemas-showtimes">
        <div className='container row'>
            <Systems systems={systems}/>
        </div>
    </div>
  )
}
