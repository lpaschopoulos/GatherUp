import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput, Button } from 'mdb-react-ui-kit';
import "./Login.css";
import logoImage from '../../assets/images/gathering-for-logo.jpg';
import logoImages from '../../assets/images/location-map-marker-icons-icon.png';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  function login() {
    axios.post("http://localhost:3636/user/login", { email, password })
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/profile");
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred during login.");
      });
  }

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src={logoImage} alt="login form" className='rounded-start w-100' />
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <img src={logoImages} alt="GatherUp Logo" />
                <span className="fw-bold mb-0 GU">GatherUp</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
              <MDBInput wrapperClass='mb-4' placeholder="Email address"  type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder="Password"  type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />
              <MDBBtn className=" loginbtn" type="button" color='dark' size='lg' onClick={()=>{ login();}} disableRipple>Login</MDBBtn>
              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}> Don't have an account? <Link to="/register" style={{ color: '#393f81' }}>Register here</Link>
      </p>              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
