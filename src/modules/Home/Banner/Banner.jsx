import React, {useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../../../apis/movieAPI";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { GoPlay } from "react-icons/go";
import ReactPlayer from "react-player";
import Modal from "react-modal";

// Slick carousel customs Arrow
function NextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow"
      style={{
        ...style,
        display: "block",
        position: "absolute",
        right: "50px",
        top: "50%",
        transform: "translate(0, -50%)",
        zIndex: 1,
        width: "50px",
        height: "50px",
        color: "white",
        opacity: 0.75,
        fontSize: "80px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <GoChevronRight></GoChevronRight>
    </div>
  );
}
function PrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow"
      style={{
        ...style,
        display: "block",
        position: "absolute",
        left: "50px",
        top: "50%",
        transform: "translate(-50% ,-50%)",
        zIndex: 1,
        width: "50px",
        height: "50px",
        color: "white",
        opacity: 0.75,
        fontSize: "80px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <GoChevronLeft></GoChevronLeft>
    </div>
  );
}
export default function Banner() {
  const {
    data: banners = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["banners"], queryFn: getBanners });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [url, setUrl] = useState(null);

    const trailers = [
   "https://www.youtube.com/watch?v=uoKSzOuPcfY",
   "https://www.youtube.com/watch?v=kBY2k3G6LsM&t",
   "https://www.youtube.com/watch?v=geMkL-lv2-4&t",
  ]


  const handleWatchTrailer = (index) => {
    console.log("index", index)
    setIsOpenModal(true);
    setUrl(trailers[index]);
    console.log("url", url)
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setUrl(null);
  };

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }
  if(error){
    return (<h1>{error}</h1>)
  }
  // Slick carousel setting
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="banner">
      <Slider {...settings} className="banner-slider">
        {banners.map((banner, index) => {
          return (
            <div key={banner.maBanner} className="banner-img">
                 <img src={banner.hinhAnh} alt=""/>;
                 <GoPlay
                     className="play-icon"
                     onClick={() => {
                      handleWatchTrailer(index);
           }}
                  ></GoPlay>
            </div>
          )
        })}
      </Slider>
      <Modal
        isOpen={isOpenModal}
        onReQuestCloseModal={closeModal}
        contentLabel="Video Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 20,
          },
          content: {
            width: "44vw",
            height: "60vh",
            margin: "auto",
            padding: "0px",
            border: "none",
          },
        }}
      >
        {url && (
          <div className="trailer-player">
            <button className="close-modal" onClick={closeModal} >x</button>
            <ReactPlayer
              url={url}
              controls={true}
              className="bg-dark overflow-hidden"
              width="100%"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
