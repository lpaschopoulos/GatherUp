import React, { useState, useEffect } from "react";
import "./Footer.css";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

function Footer() {
const [showTopBtn, setShowTopBtn] = useState(false);

useEffect(() => {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    });
}, []);

function goTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

  return (
    <div className="footerposition">
      <MDBFooter className="text-center">


        <div
  className="text-center p-3">
  <MDBRow className="justify-content-center mb-3">
    <MDBCol className="d-flex justify-content-center">
      <MDBBtn
        outline
        color="light"
        floating
        className="m-1"
        target="_blank"
        rel="noopener noreferrer"
        href="#!"
        role="button"
      >
        <MDBIcon fab icon="facebook-f" />
      </MDBBtn>

      <MDBBtn
        outline
        color="light"
        floating
        className="m-1"
        target="_blank"
        rel="noopener noreferrer"
        href="#!"
        role="button"
      >
        <MDBIcon fab icon="twitter" />
      </MDBBtn>

      <MDBBtn
        outline
        color="light"
        floating
        className="m-1"
        target="_blank"
        rel="noopener noreferrer"
        href="#!"
        role="button"
      >
        <MDBIcon fab icon="google" />
      </MDBBtn>

      <MDBBtn
        outline
        color="light"
        floating
        className="m-1"
        target="_blank"
        rel="noopener noreferrer"
        href="#!"
        role="button"
      >
        <MDBIcon fab icon="instagram" />
      </MDBBtn>

      <MDBBtn
        outline
        color="light"
        floating
        className="m-1"
        target="_blank"
        rel="noopener noreferrer"
        href="#!"
        role="button"
      >
        <MDBIcon fab icon="linkedin-in" />
      </MDBBtn>

      <MDBBtn 
        outline
        color="light"
        floating
        className="m-1"
        target="_blank"
         rel="noopener noreferrer"
        href="https://github.com/lpaschopoulos"
        role="button"
      >
        <MDBIcon fab icon="github" />
      </MDBBtn>
    </MDBCol>
  </MDBRow>

  <p>
    &copy; {new Date().getFullYear()} GatherUp. All rights reserved.
  </p>
</div>
{
        showTopBtn && (
          <div className="go-top" onClick={goTop}></div>
        )
      }
      </MDBFooter>
    </div>
  );
};

export default Footer;
