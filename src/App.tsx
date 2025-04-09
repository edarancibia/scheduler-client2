import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';
import CalendarPage from './components/CalendarPage';
import Login from "./components/Login";
import UserRegister from "./components/UserRegister";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import CreateBusiness from "./components/CreateBusiness";
import InviteUserRegister from "./components/InviteUserRegister";

const App = () => {
  const location = useLocation();
  const [showCreateBusiness, setShowCreateBusiness] = useState(false);

  const handleUserRegisterSuccess = () => {
    setShowCreateBusiness(true);
  };

  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<UserRegister />}/>
        <Route path="/invite-register" element={<InviteUserRegister />}/>
        <Route path="/calendar" element={<PrivateRoute Component={CalendarPage} />} />
        <Route path="/business" element={<CreateBusiness />} />
      {/* {showCreateBusiness ? (
        <CreateBusiness />
      ) : (
        <UserRegister onSuccess={handleUserRegisterSuccess} />
      )} */}
      </Routes>
    </div>
  );
};

export default App;
