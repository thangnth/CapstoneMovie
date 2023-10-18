import React, {useState} from "react";
import { useQuery } from "@tanstack/react-query";
import  {getMovieDetails} from "../../../apis/movieAPI"

export default function MovieProfile({movieId}) {
  //useQuery to get data
  const {data = {}, isLoading, error} = useQuery({
    queryKey : ["movieDetails", movieId],
    queryFn : ()=> getMovieDetails(movieId),
    enabled : !!movieId
  })
  if(isLoading){
    return (
      <h1>Is Loading...</h1>
    )
  }
  if(error){
    return (
  <h1>{error}</h1>
    )   
  }

  //Css truncate text for data.moTa 
  function ReadMore({children = data.moTa, maxCharacterCount = 200}){
    const [isTruncated, setIsTruncated]= useState(true)
    const resultString = isTruncated?children.substr(0, maxCharacterCount):children;
    const toggleIsTruncated = ()=>{
      setIsTruncated(!isTruncated)
    }
    return (
      <p>
        {resultString}
        {isTruncated ? (<>...</>):(<></>)}
        <button className="btn text-primary ms-2"onClick={toggleIsTruncated}>{isTruncated ?"Xem thêm" : "Thu gọn" }</button>
      </p>
    )
  }


  return (
    <div className="movieProfile" style={{backgroundImage: `url(${data.hinhAnh})`}}> 
        <div className="container py-lg-5" >
          <div className="movie-info row"> 
              <div className="col-lg-3 col mb-3">
                  <img src={data.hinhAnh} alt={data.maPhim} width="100%"/>
              </div>
              
              <div className="col-lg-7 col-sm-12">
                {data.sapChieu?(<p className="text-warning">Sắp chiếu</p>):(<p className="text-warning">Đang chiếu</p>)}
                <h3 className="tenPhim">{data.tenPhim}</h3>
                <ReadMore/>
                <a href="#showTimes">
                <button className="btn btn-warning" >Mua vé</button>
                </a>  
              </div>
          </div>
        </div>
    </div>

)
}
