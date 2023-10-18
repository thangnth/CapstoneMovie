import fetcher from "./fetcher";

//Lấy danh sách phim cho component Banner
export async function getBanners() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachBanner");
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

//Lấy danh sách phim cho component Showing
export async function getMovies() {
  try {
    const response = await fetcher.get("/QuanLyphim/LayDanhSachPhim", {
      params: {
        maNhom: "GP01",
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

// Lay thong tin phim cho (component Details / MovieProfile)
export async function getMovieDetails(movieId) {
  try {
    const response = await fetcher.get("QuanLyPhim/LayThongTinPhim", {
      params: {
        MaPhim: movieId,
      },
  });
  return response.data.content;
  
} catch(error){
  throw error.response.data.content;
}
}


export async function addMovie(movie) {
  try {
    const response = await fetcher.post("/QuanLyPhim/ThemPhimUploadHinh", movie);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
