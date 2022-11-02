import React from "react"
import OrderService from "../services/order.service";

//returns a table row for each order pbject
function Orders({ order, token, getOrders }) {
  const { Order_ID, Table_No, Size, Crust, Flavor } = order;
  const date = order.Timestamp.slice(0, 10); //cuts only date out of timestamp

  const handleDeleteOrder = async () => {
    OrderService.deleteOrder(Order_ID, token)
      .then(() => getOrders())
      .catch((error) => console.log(error));
  }

  return (
    <tr key={Order_ID}>
      <td>{Order_ID}</td>
      <td>{Table_No}</td >
      <td>{date}</td>
      <td>{Size}</td>
      <td>{Crust}</td>
      <td>{Flavor}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleDeleteOrder}
        >
          Delete
        </button>
      </td>
    </tr >
  )
}

export default Orders;
