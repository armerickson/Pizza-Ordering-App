import React from "react"
import pizzaLogo from "../assets/PizzaLogo.png"

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src={pizzaLogo} title="pizza icons" style={{ width: "4rem" }} className="mr-3" />
        Fresco Pizza Ordering System
      </a>
      <div className="btn ">
        <i className="bi bi-box-arrow-right" style={{ fontSize: "2rem" }}></i>
      </div>
    </nav>
  );
}

export default Navbar;
