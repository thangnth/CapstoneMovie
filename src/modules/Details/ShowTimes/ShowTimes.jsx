import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieShowTimes } from "../../../apis/cinemaAPI";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function ShowTimes({ movieId }) {
  const [cinemas, setCinemas] = useState([]);
  const { data = {}, isLoading, error } = useQuery({
    queryKey: ["movieShowTimes", movieId],
    queryFn: () => getMovieShowTimes(movieId),
    enable: !!movieId,
  });

  const cinemaSystems = data.heThongRapChieu || [];
  const handleGetCinameSystem = (cinemaSystemId) => {
    const found = cinemaSystems.find(
      (item) => item.maHeThongRap === cinemaSystemId
    );
    setCinemas(found.cumRapChieu);
  };
  useEffect(() => {

    if (cinemaSystems.length > 0) {
      setCinemas(cinemaSystems[0].cumRapChieu);
    }
  }, [cinemaSystems]);

  const navigate= useNavigate()
  if(isLoading){<h1>Is Loading...</h1>}
  if(error){<h1>{error}</h1>}
  return (
    <div id="showTimes" className="showTime">
      <div className="container d-flex justify-content-round">
        <div className="me-lg-3">
        {cinemaSystems.map((cinemaSystem) => {
        return (
          <div key={cinemaSystem.maHeThongRap}>
            <img
              src={cinemaSystem.logo}
              alt=""
              width={50}
              height={50}
              onClick={() => {
                handleGetCinameSystem(cinemaSystem.maHeThongRap);
              }}
            />
          </div>
        );
      })}
        </div>
        <div>
        {cinemas.map((cinema) => {
        return (
          <div className="mb-lg-4">
            <h5 className="text-danger mb-lg-1">{cinema.tenCumRap}</h5>
            {cinema.lichChieuPhim.map((showtime) => {
              // const date = new Date(showtime.ngayChieuGioChieu);
              // const time = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()} ~ ${date.getHours()}:${date.getMinutes()}`;
              // return <button>{time}</button>;
              const time = dayjs(showtime.ngayChieuGioChieu).format(
                "DD-MM-YYYY ~ HH:mm"
              );
              return <button className="btn btn-outline-warning" onClick={()=>{navigate(`/booking/${showtime.maLichChieu}`)}}>{time}</button>;
            })}
          </div>
        );
       })}
        </div>
      </div>

    </div>
  );
}
