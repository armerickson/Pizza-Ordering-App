import React from "react"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom";
import OrderService from "../services/order.service";
import pizzaOptions from "../data/pizzaOptions";
import CategoryBtns from "./CategoryBtns";

function OrderForm({ toggleOrderModal, token, setOrders }) {
  //to show if table aready has that same order
  const [error, setError] = React.useState("");

  let navigate = useNavigate();

  const [order, setOrder] = React.useState({
    Crust: "",
    Flavor: "",
    Size: "",
    Table_No: 1
  });

  //attempt to place order to API
  const sendOrder = (event) => {
    event.preventDefault();

    OrderService.placeOrder(order, token)
      .then((data) => {
        handlePlaceOrder(data);
      })
      .catch((error) => {
        if (error === 409) setError("Error: Order for table " + order.Table_No + " exists already");

        // if session expired go back to Login
        if (error === 440) navigate("/home");
      });
  }

  const handlePlaceOrder = (data) => {
    setOrders((prev) => [...prev, data]);
    toggleOrderModal();
  }

  const setField = (field, value) => {
    setOrder({
      ...order,
      [field]: value,
    });
  };

  // e = eventKey from Dropdown.item (e.g. "1")
  const setTableNo = (e) => {
    setOrder({
      ...order,
      ["Table_No"]: parseInt(e),
    })
  }

  return (
    <form className="align-items-center p-3" onSubmit={sendOrder}>
      <div className="d-flex justify-content-between mb-3">
        {/* Title */}
        <div>Place an Order</div>

        {/* X button */}
        <button
          type="button"
          className="close"
          onClick={toggleOrderModal}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      {/* Form error */}
      <div>{error}</div>

      {/* Size options */}
      <h4 className="text-uppercase">Size</h4>
      <div className="row btn-group-toggle mb-4" data-toggle="buttons">
        <CategoryBtns category="Size" setField={setField} />
      </div>

      {/* Crust options */}
      <h4 className="text-uppercase">Crust</h4>
      <div className="row btn-group-toggle mb-4" data-toggle="buttons">
        <CategoryBtns category="Crust" setField={setField} />
      </div>

      {/* className options */}
      <h4 className="text-uppercase">Flavor</h4>
      <div className="row btn-group-toggle mb-4" data-toggle="buttons">
        <CategoryBtns category="Flavor" setField={setField} />
      </div>

      {/* table number selection */}
      <h4 className="text-uppercase mb-4">Table Number</h4>
      <div className="d-flex">
        {/* dropdown menu for table_no */}
        {/* todo: remove hardcoded table_no */}
        <DropdownButton
          id="dropdown-item-button"
          title="Select table number"
          onSelect={setTableNo}
        >
          <Dropdown.Item eventKey="1">1</Dropdown.Item>
          <Dropdown.Item eventKey="2">2</Dropdown.Item>
          <Dropdown.Item eventKey="3">3</Dropdown.Item>
        </DropdownButton>

        <p className="ml-4">Table {order.Table_No} selected</p>
      </div>

      {/* submit order button */}
      <button
        type="submit"
        className="btn btn-primary btn-block mt-4"
      >
        Submit
      </button>
    </form>
  );
}

export default OrderForm;
