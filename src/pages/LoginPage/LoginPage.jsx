import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage min-h-screen flex flex-col justify-center">
        <h1 className="mb-4 text-2xl">Login</h1>

        <form
          className="flex flex-col md:w-[400px] max-w-[400px] w-[90%] mx-auto"
          onSubmit={handleLoginSubmit}
        >
          <label>Email</label>
          <input
            className="p-2 rounded-md border border-neutral-400"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password</label>
          <input
            className="p-2 rounded-md border border-neutral-400"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <button className="btn btn-primary mt-6" type="submit">
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="my-4">Don't have an account yet?</p>
        <Link className="btn btn-primary mb-8 max-w-[140px] mx-auto" to={"/signup"}>
          {" "}
          Sign Up
        </Link>
      </div>
  );
}

export default LoginPage;
