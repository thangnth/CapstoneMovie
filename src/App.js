import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./sass/style.scss";
import Home from "./modules/Home";
import Details from "./modules/Details";
import NotFound from "./components/NotFound/NotFound";
import MainLayout from "./layout/MainLayout/MainLayout";
import Signin from "./modules/Auth/pages/signin";
import Signup from "./modules/Auth/pages/signup";
import UserProvider from "./contexts/UserContext/UserContext";
import ProtectedRoute from "./routers/ProtectedRoute/ProtectedRoute";
// import AdminMovie from "./modules/AdminMovie/AdminMovie";

import Booking from "./modules/Booking/Booking";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="movies/:movieId" element={<Details />} />
            <Route path="sign-in" element={<Signin />} />
            <Route path="sign-up" element={<Signup />} />
            {/* <Route element={<AdminMovieProtectedRoute />} /> */}
            {/* <Route path="/admin/movies" element={<AdminMovie />} /> */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="booking/:showtimeId"
                element={<Booking />}
              />
            </Route>
       
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
