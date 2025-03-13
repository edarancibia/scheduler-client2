import { useState } from 'react';
import CalendarPage from './components/CalendarPage';

const App = () => {
  const [showCreateBusiness, setShowCreateBusiness] = useState(false);

  const handleUserRegisterSuccess = () => {
    setShowCreateBusiness(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* {showCreateBusiness ? (
        <CreateBusiness />
      ) : (
        <UserRegister onSuccess={handleUserRegisterSuccess} />
      )} */}
      <CalendarPage />
    </div>
  );
};

export default App;
