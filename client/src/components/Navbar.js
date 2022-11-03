import React from 'react';
import {  Link } from "react-router-dom";
const Navbar= () =>{
  return (
    <div className="top">
      <div className="topLeft">
      <Link className="link" to="/">
              <img className="topImgLeft" src='/logo.jpg'/>
        </Link>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/allparks">
              NATIONAL PARKS
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/myparks">
              MY PARKS
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
          {/* <li className="topListItem">
          <i className="topIcon fab fa-facebook-square"></i>
          <i className="topIcon fab fa-instagram-square"></i>
          <i className="topIcon fa-brands fa-linkedin"></i>
          <i className="topIcon fab fa-twitter-square"></i>
          </li> */}
        </ul>
      </div>
      <div className="topRight">
        
          <Link className="link" to="/settings">
            <img
              className="topImgRight"
              src="https://media-exp1.licdn.com/dms/image/C5603AQGX50b82Rl71Q/profile-displayphoto-shrink_200_200/0/1653429597671?e=1671062400&v=beta&t=dfsPxac6BfBPksQz54Ic5u0Zl4P_5xQkjWpQoW_chIA"
              alt="my picture facing front"
            />
          </Link>
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
export default Navbar;