import React, {useState} from 'react'
import SeatList from './SeatList'
import { getSeatList } from '../../apis/cinemaAPI'
import { useQuery } from '@tanstack/react-query'
import Ticket from './Ticket'
import {useParams} from "react-router-dom"


export default function Booking() {
  const {showtimeId} = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const {data = {}, isLoading } = useQuery({
    queryKey : ["seatList", showtimeId],
    queryFn : ()=>getSeatList(showtimeId),
    enable: !!showtimeId,
})
if(isLoading){
    return (<h1>Is Loading...</h1>) 
}
const seatList = data.danhSachGhe || [];
const movieInfo = data.thongTinPhim || {}

  return (
    // <div className='booking d-flex justify-content-between'>
    <div className='booking'>
      {/* <div className="container d-flex justify-content-between"> */}
      <div className="container row">
      <SeatList seatList = {seatList} selectedSeats = {selectedSeats} onSelectedSeatsChange = {(selectedSeats)=>{setSelectedSeats(selectedSeats)}}/>
       <Ticket selectedSeats = {selectedSeats} movieInfo={movieInfo} onSelectedSeatsChange = {(selectedSeats)=>{setSelectedSeats(selectedSeats)}} />
      </div>
    </div>
  )
}
