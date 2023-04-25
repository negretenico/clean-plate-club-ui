// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create a login context
export const LoginContext = createContext();

// Create a login context provider
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/prop-types
export const LoginContextProvider = ({ children }) => {
  // Define the initial authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [user, setUser] = useState({});
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // Function to handle login
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleLogin = (data) => {
    // Call API to authenticate user
    // If login is successful, update isLoggedIn and userName state
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    axios.post('http://localhost:5000/api/users/login', { email: data.email, password: data.password })
      .then((response) => {
        const token: string = response.data.access_token;
        axios.post('http://localhost:5000/api/users/foo', {}, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
            'Access-Control-Allow-Origin': 'true'
          }
        })
          .then((response) => {
            setIsLoggedIn(true);
            setUser((prevUser) => ({ ...prevUser, ...response.data }));
            localStorage.setItem('isLoggedIn', 'true');
          })
          .catch((error) => {
            // handle error
            if ((Boolean(error.response)) && error.response.status === 500) {
              console.log('Internal Server error');
              window.location('/');
            }
          });
      }).catch((error) => {
      // handle error
        if ((Boolean(error.response)) && error.response.status === 500) {
          console.log('Internal Server error');
          window.location('/');
        }
      });
  };

  // Function to handle logout
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleLogout = () => {
    // Call API to log out user
    // If logout is successful, update isLoggedIn and userName state
    setIsLoggedIn(false);
    setUser('');
    localStorage.removeItem('isLoggedIn');
  };

  // Value to be provided by the login context
  const loginContextValue = {
    isLoggedIn,
    user,
    handleLogin,
    handleLogout
  };

  // Render the login context provider with the provided value
  return (
    <LoginContext.Provider value={loginContextValue}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to consume the login context
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useLoginContext = () => {
  const context = React.useContext(LoginContext);
  // eslint-disable-next-line no-extra-boolean-cast
  if (!(Boolean(context))) {
    throw new Error('useLoginContext must be used within a LoginContextProvider');
  }
  return context;
};
