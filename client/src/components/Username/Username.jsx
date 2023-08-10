import "./Username.css"
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Context/context";

const Username = ({userInfo, isChecked, onToggle}) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function ToggleSwitch({ isChecked, onToggle }) {
    return (
        <>
            <input 
                type="checkbox" 
                name="check-toggle" 
                hidden 
                checked={isChecked} 
                onChange={onToggle}
            />
            <label 
                onClick={onToggle} 
                className="toggle"
            >
                Events
                <div className="toggle__switch">
                    <div className={`toggle__circle ${isChecked ? "checked" : ""}`}></div>
                </div>
                Attend
            </label>
        </>
    );
  }
  
  function logout(){
    localStorage.removeItem("token")
    setUser(null);

    navigate("/")
  }

  const handleCreateEvent = () => {
    console.log("Button clicked!");
    navigate(`/create/${userInfo._id}`);
  };

  const handleAccount = () => {
    console.log("Button clicked!");
    navigate(`/account/${userInfo._id}`);
  };

  return (
    <div className="button-container">
      
<h1 className="username">
    Welcome
    <div className="username-color">
        {userInfo?.username}

    </div>
</h1>        <div className="buttons-row">
  
      <button className="buttonU Explore" onClick={handleCreateEvent}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="actionbuttons">
          <path
            clipRule="evenodd"
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z"
          ></path>
        </svg>
        New Event
      </button>
      <button className="buttonU Account" onClick={handleAccount}>
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="actionbuttons">
          <g id="Layer_2" data-name="Layer 2">
            <g id="invisible_box" data-name="invisible box">
              <rect width="48" height="48" fill="none"></rect>
            </g>
            <g id="icons_Q2" data-name="icons Q2">
              <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM34.7,14.7,28,28,14.7,34.7a1.1,1.1,0,0,1-1.4-1.4L20,20l13.3-6.7A1.1,1.1,0,0,1,34.7,14.7ZM24,22a2,2,0,1,0,2,2A2,2,0,0,0,24,22Z"></path>
              <path d="M24,22a2,2,0,1,0,2,2A2,2,0,0,0,24,22Zm0,0a2,2,0,1,0,2,2A2,2,0,0,0,24,22Z"></path>
            </g>
          </g>
        </svg>
        Account
      </button>
      <button className="buttonU Logout" onClick={()=>{logout();
        }}>
      <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" className="actionbuttons">
    <g id="LogoutIcon">
        <rect x="3" y="5" width="8" height="10" stroke="red" strokeWidth="2" fill="none" />
        <circle cx="10" cy="10" r="0.5" fill="red" />
        <path d="M 13 10 L 19 10 M 19 10 L 16 7 M 19 10 L 16 13" stroke="red" strokeWidth="2"/>
    </g>
</svg>
        Logout
      </button>
      
    </div>
    <ToggleSwitch isChecked={isChecked} onToggle={onToggle} />

    </div>
  );
};

export default Username;
