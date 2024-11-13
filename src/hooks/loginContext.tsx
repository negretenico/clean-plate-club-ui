import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import type User from '../types/User';
import type Registration from '../types/Registration';
import { useCookies } from 'react-cookie';

interface LoginContextProps {
  isLoggedIn: boolean
  user: User
  handleLogin: (data: Registration) => void
  handleLogout: () => void
}

// Create a login context
export const LoginContext = createContext<LoginContextProps>({
  isLoggedIn: false,
  handleLogin: function (data: Registration): number {
    throw new Error('Function not implemented.');
  },
  handleLogout: function (): void {
    throw new Error('Function not implemented.');
  },
  user: {
    current_goals: '',
    email: '',
    id: '',
    name: '',
    past_goals: '',
    trainer: ''
  }
});

const initialUser = {
  current_goals: '',
  email: '',
  id: '',
  name: '',
  past_goals: '',
  trainer: ''
};
export const LoginContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  // Define the initial authentication state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>(initialUser);
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const cookieToken: string = cookies.access_token;
    axios.post('http://localhost:5000/api/users/foo', {}, {
      headers: {
        Authorization: `Bearer ${cookieToken}`, // Set the Authorization header with the Bearer token
        'Access-Control-Allow-Origin': 'true'
      }
    })
      .then((response) => {
        setIsLoggedIn(true);
        setUser((prevUser) => ({ ...prevUser, ...response.data }));
        setCookie('access_token', cookieToken); // Set the access token as a cookie
      })
      .catch((error) => {
        // handle error
        if ((Boolean(error.response)) && error.response.status === 500) {
          console.log('Internal Server error');
        }
      });
  }, []);
  const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isLoggedIn) {
      const cookieToken: string = cookies.access_token;

      intervalId = setInterval(() => {
        axios.post('http://localhost:5000/api/users/refresh-token', {
          refreshToken: cookieToken
        }).then((response) => {
          setCookie('access_token', response.data.access_token);
        }).catch((error) => {
          console.error(error);
        });
      }, REFRESH_INTERVAL);
    }

    return () => { clearInterval(intervalId); };
  }, [isLoggedIn]);
  const handleLogin = (data: Registration): void => {
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
            setCookie('access_token', token); // Set the access token as a cookie
          })
          .catch((error) => {
            // handle error
            if ((Boolean(error.response)) && error.response.status === 500) {
              console.log('Internal Server error');
            }
          });
      }).catch((error) => {
        // handle error
        if ((Boolean(error.response)) && error.response.status === 500) {
          console.log('Internal Server error');
        }
      });
  };

  const handleLogout = (): void => {
    // Call API to log out user
    // If logout is successful, update isLoggedIn and userName state
    setIsLoggedIn(false);
    setUser(initialUser);
    removeCookie('access_token'); // Delete the access token cookie
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

export const useLoginContext = (): LoginContextProps => {
  const context = React.useContext(LoginContext);
  return context;
};
