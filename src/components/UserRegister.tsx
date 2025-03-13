import  { useState } from 'react';
import Card from './Card';
import Button from './Button';


const UserRegister = () => {
    const [formData, setFormData] = useState({
      name: '',
      lastname: '',
      email: '',
      confirmEmail: '',
      password: '',
      phone: '',
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [emailMatch, setEmailMatch] = useState(true);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const { name, lastname, email, confirmEmail, password, phone } = formData;
  
      if (email !== confirmEmail) {
        setEmailMatch(false)
        setTimeout(() => setEmailMatch(true), 5000);
      }
  
      // Mock user creation
      const mockUser = { name, lastname, email, password, phone };
      console.log('User registered successfully:', mockUser);
  
      // Show success banner
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
  
      // Reset form
      setFormData({
        name: '',
        lastname: '',
        email: '',
        confirmEmail: '',
        password: '',
        phone: '',
      });
    };
  
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        {showSuccess && (
          <div className="fixed top-4 w-11/12 max-w-md bg-green-600 text-white text-center py-2 px-4 rounded-lg shadow-md transition-opacity duration-500 ease-in-out animate-fade">
            Registration successful!
          </div>
        )}

        {!emailMatch && (
            <div className="fixed top-4 w-11/12 max-w-md bg-red-600 text-white text-center py-2 px-4 rounded-lg shadow-md transition-opacity duration-500 ease-in-out animate-fade">
                Emails do not match
            </div>
        )}

        <Card className="w-full max-w-md p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">User Registration</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
                placeholder="Confirm Email"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Register
            </Button>
          </form>
        </Card>
      </div>
    );
  };
  
  export default UserRegister;
