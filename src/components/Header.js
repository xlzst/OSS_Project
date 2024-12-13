import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{fontSize: "2rem"}}>
          K-Mooc 강의정보 시스템
        </Link>
        </div>
        <br/>
        <div className="collapse navbar-collapse" id="navbarNav">
              <Link className="nav-link" to="/">
                Main Page
              </Link>
              <Link className="nav-link" to="/mypage">
                My Wish List
              </Link>
        </div>
    </nav>
  );
}