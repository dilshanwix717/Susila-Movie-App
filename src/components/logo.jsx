import React, { memo, Fragment } from "react";

// react-router
import { Link } from "react-router-dom";

// img
import img1 from "/assets/images/SLFLICKS.png";
import img2 from "/assets/images/Susila.png";


import hostar from "/assets/images/logo-hotstar.webp";
import prime from "/assets/images/logo-prime.webp";
import hulu from "/assets/images/logo-hulu.webp";

const Logo = memo(() => {
  return (
    <Fragment>
      <div className="logo-default">
        <Link className="navbar-brand text-primary" to="/home">
          <img
            className="img-fluid logo logo-lg" // Add logo-lg class
            src={img2}
            loading="lazy"
            alt="streamit"
          //style={{ width: 68, height: 200 }} // Add inline styles

          />
          {/* <img
            className="img-fluid logo"
            src={img1}
            loading="lazy"
            alt="streamit"
          /> */}

        </Link>
      </div>
      <div className="logo-hotstar">
        <Link className="navbar-brand text-primary" to="/">
          <img
            className="img-fluid logo"
            src={hostar}
            loading="lazy"
            alt="streamit"
          />
        </Link>
      </div>
      <div className="logo-prime">
        <Link className="navbar-brand text-primary" to="/">
          <img
            className="img-fluid logo"
            src={prime}
            loading="lazy"
            alt="streamit"
          />
        </Link>
      </div>
      <div className="logo-hulu">
        <Link className="navbar-brand text-primary" to="/">
          <img
            className="img-fluid logo"
            src={hulu}
            loading="lazy"
            alt="streamit"
          />
        </Link>
      </div>
    </Fragment>
  );
});

Logo.displayName = "Logo";
export default Logo;
