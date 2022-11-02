import React from "react"
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import OrderModal from '../components/OrderModal';
import OrderService from "../services/order.service";
import Order from '../components/Order';




function Home({ token }) {
  const [orderModalVisible, setOrderModalVisible] = React.useState(false);
  const [orders, setOrders] = React.useState([]);

  let navigate = useNavigate();

  const toggleOrderModal = () => setOrderModalVisible((prev) => !prev);
  const goToLogin = () => navigate("/");

  React.useEffect(() => {
    if (!token) goToLogin();
    getOrders();
  }, [])

  // get past orders from the API
  const getOrders = async () => {
    OrderService.getOrders(token)
      .then((ordersObj) => {
        setOrders(ordersObj);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="container-fluid p-0">
      {/* navigation bar */}
      <Navbar />

      {/* only show orders if we have a token */}
      {token &&
        <div className="card bg-light m-lg-5 mt-3 pb-5 shadow-sm">
          <OrderModal
            orderModalVisible={orderModalVisible}
            toggleOrderModal={toggleOrderModal}
            token={token}
            setOrders={setOrders}
          />

          <div className="row justify-content-between mx-5 mb-5 pt-5">
            <h3>Orders</h3>
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleOrderModal}
              aria-label="Close"
            >
              New Order
            </button>
          </div>

          {/* table of orders */}
          <table className="table table-responsive-sm px-2">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Table No.</th>
                <th scope="col">Date</th>
                <th scope="col">Size</th>
                <th scope="col">Crust</th>
                <th scope="col">Flavor</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => <Order key={order.Timestamp} order={order} token={token} toggleOrderModal={toggleOrderModal} getOrders={getOrders} />)}
            </tbody>
          </table>
        </div >}
    </div >
  );
}

export default Home;
