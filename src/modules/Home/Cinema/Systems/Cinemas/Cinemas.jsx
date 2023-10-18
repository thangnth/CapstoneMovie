import React, {useState, useEffect} from 'react'
import { getCinemasAndShowTimes } from '../../../../../apis/cinemaAPI'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

export default function Cinemas({id}) {

  const {data = []} = useQuery({
    queryKey : 
    ['cinemas', id],
    queryFn : ()=> getCinemasAndShowTimes(id),
    enabled: !!id
  });
  const renderedCinemas = data[0]?.lstCumRap || []
  const defaultShows = renderedCinemas[0]?.danhSachPhim || []
  const [shows , setShows] = useState([])
  
  useEffect(()=>{ 
    console.log('defaultShows', defaultShows)
      if(renderedCinemas.length > 0){
          setShows(defaultShows)}
      },[renderedCinemas])
  const handleSelectCinema = (selectedCinema)=>{
      const selectedShows = selectedCinema.danhSachPhim
      setShows(selectedShows)
  }
  
  
  const navigate = useNavigate()
  
    return (
      <>
          <div className='cinemas col-lg-4'>
              {renderedCinemas.map((cinema)=> {
                return (
                <div className="cinema mb-2"key={cinema.maCumRap}>
                  <p>{cinema.tenCumRap}</p>
                  <p>{cinema.diaChi}</p>
                  <button className="btn btn-outline-danger" onClick={()=>{handleSelectCinema(cinema)}}>Lịch Chiếu</button>
                </div>
              )})
              }
          </div>
          <div className='movie-showtimes col-lg-7'>  
              {shows.map((show)=>{
                  return (
                      <div className='movie d-flex justify-content-round mb-lg-3' key={show.maPhim}>
                          <img src={show.hinhAnh} alt="" width='20%' height='20%'/>
                          <div className='showtimes ms-2 mb-3'>
                              <p className='movieName ms-lg-2 mb-lg-1 text-success fw-bold'>{show.tenPhim}</p>
                              {show.lstLichChieuTheoPhim.map((showtime)=>{
                                const time = dayjs(showtime.ngayChieuGioChieu).format(
                                  "DD-MM-YYYY ~ HH:mm"
                                );
                                return <button className="btn btn-outline-danger m-lg-1" onClick={()=>{navigate(`/booking/${showtime.maLichChieu}`)}}>{time}</button>
                              })}
                          </div>
                      </div>
                  )
              })}
          </div>
      </>
  
    )
  }
