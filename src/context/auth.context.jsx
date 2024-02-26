import { useState, useEffect, createContext } from "react";
import authService from "../services/auth.service";
import profileService from "../services/profile.service";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // Send a request to the server using axios
      /* 
        axios.get(
          `${process.env.REACT_APP_SERVER_URL}/auth/verify`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {})
        */

      // Or using a service
      authService
        .verify()
        .then((response) => {
          // If the server verifies that JWT token is valid  ✅
          const user = response.data;
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setLoggedInUser(user);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token) ❌
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setLoggedInUser(null);
        });
    } else {
      // If the token is not available
      setIsLoggedIn(false);
      setIsLoading(false);
      setLoggedInUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    // Upon logout, remove the token from the localStorage
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    // Run this code once the AuthProviderWrapper component in the App loads for the first time.
    // This effect runs when the application and the AuthProviderWrapper component load for the first time.
    authenticateUser();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      profileService.getOne(loggedInUser._id).then((response) => {
        setUserInfo(response.data.user);
      });
    }
  }, [loggedInUser]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        loggedInUser,
        userInfo,
        setUserInfo,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
