import { Routes, Route, useLocation } from "react-router-dom";
import CalendarPage from './components/CalendarPage';
import Login from "./components/auth/Login";
import UserRegister from "./components/UserRegister";
import PrivateRoute from "./components/PrivateRoute";
import CreateBusiness from "./components/CreateBusiness";
import InviteUserRegister from "./components/InviteUserRegister";
import PublicNavbar from "./components/nav/PublicNavbar";
import Navbar from "./components/nav/Navbar";
import LandingPage from "./components/Landing";
import Campaigns from "./components/Campaigns";
import Prices from "./components/Price";
import ForgotPassword from "./components/auth/ForgotPass";
import ResetPassword from "./components/auth/ResetPassword";

const App = () => {
  const location = useLocation();

  const isNotAuthRoute =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/invite-register" ||
    location.pathname === "/business" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

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
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/price" element={<Prices />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
      </Routes>
    </div>
  );
};

export default App;
