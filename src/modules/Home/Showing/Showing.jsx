import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../../apis/movieAPI";
import { Container } from "react-bootstrap";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { GoPlay } from "react-icons/go";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Navigation, Pagination, Grid } from 'swiper/modules';

export default function Showing() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleWatchTrailer = (movie) => {
    setIsOpenModal(true);
    setSelectedMovie(movie);
    console.log('selectedMovie', selectedMovie)
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedMovie(null);
  };
  return (
    <div className="showing">
      <Container>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              grid: { rows: 1, fill : "row"  },
            },
            579: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              grid: { rows: 1, fill : "row"  },
            },
            769: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              grid: { rows: 2, fill : "row"  },
            },
            993: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              grid: { rows: 2, fill : "row" },
            },
            1201: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              grid: { rows: 2, fill : "row" },
            },
          }}
          navigation={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination, Navigation]}
          className="mySwiper"
        >
          {data.map((movie) => {
            return (
              <SwiperSlide key={movie.maPhim}>
                <Card
                  style={{ width: "18rem" }}
                  className="movie-card mt-sm-4 text-center"
                >
                  <div className="movie-img">
                    <Card.Img variant="top" src={movie.hinhAnh} />
                    <GoPlay
                      className="play-icon"
                      onClick={() => {
                        handleWatchTrailer(movie);
                      }}
                    ></GoPlay>
                  </div>
                  <Card.Body>
                    <Card.Title>{movie.tenPhim}</Card.Title>
                    <Button
                      variant="danger"
                      onClick={() => {
                        navigate(`/movies/${movie.maPhim}`);
                      }}
                    >
                      Chi Tiết
                    </Button>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>     
      <Modal
        isOpen={isOpenModal}
        onReQuestCloseModal={closeModal}
        contentLabel="Video Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 2,
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
        {selectedMovie && (
          <div className="trailer-player">
            <button className="close-modal" onClick={closeModal} >x</button>
            <ReactPlayer
              url={selectedMovie.trailer}
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
