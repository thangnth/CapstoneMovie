// set up thu vien axios instance
import axios from "axios";
const fetcher = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjIxLzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwODQ3MzYwMDAwMCIsIm5iZiI6MTY4MTE0NjAwMCwiZXhwIjoxNzA4NjIxMjAwfQ.2JFd_iMYjvwU4SaKsLmL_x-kEZcKonddkHVR7z3Gxbc",
  },
});
//Request interceptor
// fetcher.interceptors.request.use((request) => {
//   //Kiểm tra xem user đã đăng nhập chưa, nếu rồi thêm token của user vào header
//   const user = JSON.parse.localstorage.getItem("currentUser");
//   if (user) {
//     request.headers.Authorization = `Bearer $user.accessToken}`;
//   }
//   return request;
// });
//Response interceptor
// fetcher.interceptors.response.use(
//   (response) => {
//     //Có thể Thay đổi response trước khi trả về
//     // return response.data.content;
//     //--> ta thay đổi return của call API thành return response thay vì return response.data.content
//   },
//   (error) => {
//     //Nếu lỗi 401 - token ko hợp lệ : sign out
//     if (error.response.status === 401) {
//       localStorage.removeItem("currentUser");
//       window.location.replace("/sign-in");
//     }
//     return Promise.reject(error);
//   }
// );
export default fetcher;
