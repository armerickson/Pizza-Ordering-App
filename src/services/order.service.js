//handles ordering tasks to and from the api
function OrderService() {
  //will proxy through express server hosted on 5000
  const serverEndpoint = "http://localhost:5000";

  //place order: requires order object and access_token
  const placeOrder = async (order, token) => {
    console.log("token " + JSON.stringify(token))
    const endpoint = serverEndpoint + "/placeOrder";

    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })

    if (!response.ok) throw (response.status);

    const data = await response.json();
    return data;
  };

  //get orders: requires access_token
  const getOrders = async (token) => {
    const endpoint = serverEndpoint + "/getOrders";

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })

    if (!response.ok) throw (response.status);

    const data = response.json();
    return data;
  };

  //delete order: requires order_ID and access_token
  const deleteOrder = async (order_ID, token) => {
    const endpoint = `${serverEndpoint}/deleteOrder/${order_ID}`;

    const response = await fetch(endpoint, {
      method: "DELETE",
      params: JSON.stringify({ order_ID: order_ID }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })

    if (!response.ok) throw (response.status);

    const data = response.json();
    return data;
  };

  return { placeOrder, getOrders, deleteOrder }
}

export default new OrderService;
