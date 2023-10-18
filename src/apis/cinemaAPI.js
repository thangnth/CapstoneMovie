import fetcher from "./fetcher";
//Get Showing time base on movieID for showTime.jsx : 
export async function getMovieShowTimes(movieId) {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        MaPhim: movieId,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

//Component Cinema.jsx : 
//Lấy danh sách hệ thống rạp cho component Cinema.jsx 
export async function getSystems () {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinHeThongRap")
    return response.data.content;
  }
  catch (error){
      throw error.response.data.content;
  }
}
//Lấy danh sách rạp cho mỗi hệ thống rạp trong component Cinema.jsx
export async function getCinemas (systemId){
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinCumRapTheoHeThong", {
      params: {
        maHeThongRap : systemId,
      }
    })
    return response.data.content;
  }
  catch(error){
    throw error.response.data.content;
  }
}

//Lấy danh sách phim theo mã hệ thống rạp (component Cinema / MovieList)
export async function getCinemasAndShowTimes(systemId) {
  try {
    const response = await fetcher.get("QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maHeThongRap : systemId,
        maNhom: "GP01",
      },
    });
    return response.data.content;
    
  } catch (error) {
    throw error.response.data.content;
  }
}

//Lấy danh sách phòng vé
export async function getSeatList(showtimeId) {
  try {
    const response = await fetcher.get("/QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: showtimeId,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
//Thay đổi danh sách phòng vé
// export const changeSeatStatus = async (showTimeId) => {
//   try {
//     const response = await fetcher.post("/QuanLyDatVe/LayDanhSachPhongVe", {params: {
//         MaLichChieu: showTimeId,
//       },
//     });
//     return response.data?.content;
//   } catch (error) {
//     throw error.response.data?.content;
//   }
// };


