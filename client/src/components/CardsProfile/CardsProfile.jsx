// CardsProfile.js
import React from "react";
import "./CardsProfile.scss";

function CardsProfile() {
  return (
    <div className="page-container">
      {/* Container One */}
      <div className="container one">
        <h3 style={{ paddingLeft: "25px" }}>Your List of Events:</h3>
        <div className="grid-cards">
          {/* Card 1 */}
          <div className="card">
            {/* ... (Card 1 content, same as in the previous code) ... */}
          </div>

          {/* Card 2 */}
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzQzNjkw&ixlib=rb-1.2.1&q=80&w=600"
              alt="img-2"
              title="card image"
            />
            <div className="card-body">
              <h3 className="title-card">Lorem ipsum dolor</h3>
              <p>
                Suspendisse et commodo velit. Suspendisse porttitor, nisi ac
                luctus suscipit, risus dolor facilisis ligula.
              </p>
            </div>
            <div className="card-footer">
              <a href="#">Click here</a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1538688273852-e29027c0c176?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzQzNjEx&ixlib=rb-1.2.1&q=80&w=600"
              alt="img-3"
              title="card image"
            />
            <div className="card-body">
              <h3 className="title-card">Lorem ipsum dolor</h3>
              <p>
                Cras maximus eros eleifend luctus interdum. Vestibulum tincidunt nisi eget turpis faucibus, sit amet ultrices tortor tempor.
              </p>
            </div>
            <div className="card-footer">
              <a href="#">Click here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsProfile;
