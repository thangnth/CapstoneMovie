import React from 'react';
// import { useQuery} from '@tanstack/react-query';
// import {getSeatList} from "../../../apis/cinemaAPI";
import cn from "classnames";

export default function SeatList({showtimeId, seatList, selectedSeats, onSelectedSeatsChange}) {

    const handleSelectSeat = (seat)=>{
        //Tìm xem trong mảng selectedSeats đã có seat chưa 
        const isSelected = selectedSeats.includes(seat) ;
        //Nếu trong mảng selectedSeats đã có seat thì khi click vào remove seat ra khỏi selectedSeat (dùng filter)
        if(isSelected){
            onSelectedSeatsChange (selectedSeats.filter((selectedSeat)=>{return selectedSeat !==seat}))
        //Nếu trong mảng selectedSeats chưa có thì thêm seat vào mảng
        }else{
            onSelectedSeatsChange ([...selectedSeats, seat])
        }
       }

  return (
    <div className="col-lg-7 col-sm-12">
        <div className="screen">MÀN HÌNH</div>
        <div className= "seatList row">
            {seatList.map((seat)=>{
                return (
                    <button className={cn("seat btn", {
                        "selected" : selectedSeats.includes(seat),
                        "vip": seat.loaiGhe === "Vip",
                        "btn-danger" : seat.daDat,
                     })} disabled={seat.daDat} key={seat.maGhe} onClick={()=>{handleSelectSeat(seat)}}>
                        {seat.tenGhe}
                    </button>
                )
            })}
        </div>
        <div className="text-white text-center d-flex justify-content-round my-4">
            <div><span>Ghế đã chọn</span><button className="seat btn btn-danger"></button></div>
            <div>Ghế đang chọn<button className="seat btn btn-success"></button></div>
            <div>Ghế VIP<button className="seat btn vip"></button></div>
            <div>Ghế trống<button className="seat btn"></button></div>

        </div>
    </div>

  )
}
