import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token',token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [token]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setToken(null);
        }
      }
    };

    checkTokenExpiration();
    const expirationCheckTimer = setInterval(checkTokenExpiration, 300000);
    return () => clearInterval(expirationCheckTimer);

  }, [token]);

  const ensureTokenIsSet = (timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const checkAuthorizationHeader = () => {
        if (token && axios.defaults.headers.common["Authorization"]) {
          resolve();
        } 
        else if (Date.now() > startTime + timeout) {
          reject(new Error("Token setting timed out."));
        } else {
          setTimeout(checkAuthorizationHeader, 100);
        }
      };

      checkAuthorizationHeader();
    });
  };

  axios.interceptors.request.use(async config => {
    if (config.skipAuth) {
      return config;
    }

    try {
      if (!config.headers.Authorization) {
        await ensureTokenIsSet();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
    
    return config;
  }, error => {
    return Promise.reject(error);
  });

  const contextValue = useMemo(
    () => ({
      token,
      setToken
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
