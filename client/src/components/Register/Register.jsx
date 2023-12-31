import React, { useState, useContext } from "react";
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
  MDBInput,
} from "mdb-react-ui-kit";
import "./Register.css";
import logoImage from "../../assets/images/gathering-for-logo.jpg";
import logoImages from "../../assets/images/location-map-marker-icons-icon.png";
import { UserContext } from "../../Context/context"; // Import UserContext

function Register() {
  const navigate = useNavigate();
  const { setUser: setLoggedInUser } = useContext(UserContext); // Get setLoggedInUser from UserContext
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages


  async function register() {
    try {
      const { data } = await axios.post("http://localhost:3636/user/signup", {
        username,
        email,
        password,
      });

      if (data.token) {
        localStorage.setItem("token", data.token);

        // Fetch the user's details using the verify endpoint. this way the users infos are displayed right after the registration in the account component.
        axios
          .post("http://localhost:3636/user/verify", { token: data.token })
          .then((response) => {
            if (response.data && response.data._id) {
              setLoggedInUser(response.data);
              navigate("/profile");
            } else {
              alert("Error fetching user data.");
            }
          })
          .catch((error) => {
            alert("Error verifying token. Please try again.");
          });
      } else {
        alert(data.msg);
      }
    } catch (error) {
      // Error handling code here
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.msg);
        } else {
          alert(
            `An error occurred: ${error.response.status} ${error.response.statusText}`
          );
        }
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
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
                Register for free
              </h5>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Username"
                id="formControlLg"
                type="email"
                size="lg"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Password"
                id="formControlLg"
                type="password"
                size="lg"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={register}
              >
                Register
              </MDBBtn>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                {" "}
                Already have an account{" "}
                <Link to="/login" style={{ color: "#393f81" }}>
                  Login
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

export default Register;
