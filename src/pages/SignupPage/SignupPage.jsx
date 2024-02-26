import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";


function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username };

    // using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage min-h-screen flex flex-col justify-center">
      <h1 className="mb-4 text-2xl mt-8">Sign Up</h1>

      <form
        className="flex flex-col max-w-[400px] w-[90%] md:w-[400px] mx-auto"
        onSubmit={handleSignupSubmit}
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

        <label>Username</label>
        <input
          className="p-2 rounded-md border border-neutral-400"
          type="text"
          name="name"
          value={username}
          onChange={handleUsername}
        />

        <button className="btn btn-primary mt-6" type="submit">
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="my-4">Already have account?</p>
      <Link className="btn btn-primary mb-8 max-w-[140px] mx-auto" to={"/login"}>
        Login
      </Link>
    </div>
  );
}

export default SignupPage;
