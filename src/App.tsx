import { Routes, Route, useLocation } from "react-router-dom";
import CalendarPage from './components/CalendarPage';
import Login from "./components/Login";
import UserRegister from "./components/UserRegister";
import PrivateRoute from "./components/PrivateRoute";
import CreateBusiness from "./components/CreateBusiness";
import InviteUserRegister from "./components/InviteUserRegister";
import PublicNavbar from "./components/nav/PublicNavbar";
import Navbar from "./components/nav/Navbar";
import LandingPage from "./components/Landing";

const App = () => {
  const location = useLocation();

  const isNotAuthRoute =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/invite-register" ||
    location.pathname === "/business" ||
    location.pathname === "/forgot-password";

    const shouldShowNavbar = location.pathname !== "/";

  return (
    <div className="min-h-screen bg-gray-100">
      {shouldShowNavbar && (isNotAuthRoute ? <PublicNavbar /> : <Navbar />)}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/invite-register" element={<InviteUserRegister />} />
        <Route path="/calendar" element={<PrivateRoute Component={CalendarPage} />} />
        <Route path="/business" element={<CreateBusiness />} />
      </Routes>
    </div>
  );
};

export default App;
