import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{fontSize: "2rem"}}>
          예비수강신청 페이지
        </Link>
      </div>
    </nav>
  );
}