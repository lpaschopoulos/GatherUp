import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  Button,
} from "mdb-react-ui-kit";
import "./Login.css";
import logoImage from "../../assets/images/gathering-for-logo.jpg";
import logoImages from "../../assets/images/location-map-marker-icons-icon.png";
import { UserContext } from "../../Context/context";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const handleEmailFocus = () => {
    if (errorMessage) {
      setEmail("");
      setPassword("");
      setErrorMessage("");
    }
  };

  const handlePasswordFocus = () => {
    if (errorMessage) {
      setEmail("");
      setPassword("");
      setErrorMessage("");
    }
  };

  function login() {
    axios
      .post("http://localhost:3636/user/login", { email, password })
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);

          // Fetch the user's details using the verify endpoint
          axios
            .post("http://localhost:3636/user/verify", { token: data.token })
            .then((response) => {
              if (response.data && response.data._id) {
                setUser(response.data);
                navigate("/profile");
              } else {
                setErrorMessage("Error fetching user data.");
              }
            })
            .catch((error) => {
              setErrorMessage("Error verifying token. Please try again.");

            });
        } else {
          setErrorMessage(data.msg);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.msg) {
          setErrorMessage(error.response.data.msg); // Set the error message state
        } else {
          setErrorMessage("An error occurred. Please try again."); // Set a generic error message
        }
      });
  }

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={logoImage}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <img src={logoImages} alt="GatherUp Logo" />
                <span className="fw-bold mb-0 GU">GatherUp</span>
              </div>
              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Email address"
                type="email"
                size="lg"
                value={email} // Bind the email value to the state
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleEmailFocus}

              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Password"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordFocus}

              />
              <MDBBtn
                className=" loginbtn"
                type="button"
                color="dark"
                size="lg"
                onClick={() => {
                  login();
                }}
                disableRipple
              >
                Login
              </MDBBtn>
              <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                {" "}
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#393f81" }}>
                  Register here
                </Link>
              </p>{" "}
              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
