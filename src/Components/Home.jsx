import React from "react";

//Import Components
import Product from "./Product";

export default function Home() {
  return (
    <React.Fragment>
      <div className="Hero">
        <div className="card bg-dark text-white border-0">
          <img
            className="card-img"
            src="/assets/bg.png"
            alt="Background Image"
            height="550px"
          />
          <div className="card-img-overlay d-flex flex-column justify-content-center ">
            <div className="container">
              <h5 id="kkk" className="card-title display-3 fw-bolder mb-0">
                NEW COLLECTION
              </h5>
              <p className="card-text lead fs-2 ">Change to be different</p>
            </div>
          </div>
        </div>
        <Product />
      </div>
    </React.Fragment>
  );
}
