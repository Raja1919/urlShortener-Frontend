import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleForget = () => {
    navigate("/forgetpassword");
  };

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://urlshortener-backend-p88f.onrender.com/api/login",
        {
          Email,
          Password,
        }
      );
      const { token } = response.data;

      localStorage.setItem("token", token);

      console.log(response.data);

      setIsLoggedIn(true)

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        window.alert("Incorrect email or password");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-content">
          <h3 className="form-title">Login</h3>
          <div className="text-center"></div>

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={Email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={Password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3 p-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
        <div className="forget">
          <div className="reset-password">
            <p>
              Forget?
              <button onClick={handleForget} className="btn btn-primary">
                Password
              </button>
            </p>
          </div>

          <div className="signup">
            <p>
              Not a member?
              <button onClick={handleSignup} className="btn btn-primary">
                Register
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
