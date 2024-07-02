import React from "react";

const HeaderMain = () => {
  return (
    <>
      <header className="header-banner">
        <div className="overlay"></div>
        <div className="animated-texts overlay-content">
          <h1>
            Welcome to <span className="hotel-color">Gautam Hotel</span>{" "}
          </h1>
          <h4>Experience the best Hospatility in Town</h4>
        </div>
      </header>
    </>
  );
};

export default HeaderMain;
