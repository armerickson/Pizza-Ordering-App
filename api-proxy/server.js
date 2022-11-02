const express = require('express')
const app = express()
const cors = require('cors');
const fetch = require('node-fetch');
const PORT = 5000;
const HOST = "localhost";

app.use(express.json())

app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000"
};

const apiUrl = "https://order-pizza-api.herokuapp.com/api";

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

// get access token
//returns token
app.post('/auth', cors(corsOptions), async (req, res) => {
  const endpoint = apiUrl + "/auth";
  const fetchOptions = {
    method: "POST",
    body: JSON.stringify({
      password: req.body.password,
      username: req.body.username,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }
  const response = await fetch(endpoint, fetchOptions);
  sendToFront(response, res);
});

// send order to API
//example of return: Object { Crust: "Pan", Flavor: "Pepperoni", Order_ID: 4, Size: "M", Table_No: 1, Timestamp: "2022-11-01T23:51:34.607476" }
app.post('/placeOrder', cors(corsOptions), async (req, res) => {
  const endpoint = apiUrl + "/orders";
  const authorization = req.headers.authorization;
  const order = JSON.stringify(req.body);
  console.log(req.headers);

  const fetchOptions = {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": authorization,
    },
  }
  const response = await fetch(endpoint, fetchOptions);
  console.log(response.status)

  sendToFront(response, res);
});

// get all orders
//returns array of order objects
app.get('/getOrders', cors(corsOptions), async (req, res) => {
  const endpoint = apiUrl + "/orders";
  const authorization = req.headers.authorization;

  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": authorization,
    },
  }
  const response = await fetch(endpoint, fetchOptions);
  sendToFront(response, res);
});

// deletes order based on order_ID
app.delete("/deleteOrder/:order_ID", cors(corsOptions), async (req, res) => {
  //"/deleteOrder/:order_ID" :order_ID = req.params.order_ID
  const order_ID = req.params.order_ID;

  const endpoint = `${apiUrl}/orders/${order_ID}`;
  const authorization = req.headers.authorization;

  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": authorization,
    },
  }
  const response = await fetch(endpoint, fetchOptions);
  sendToFront(response, res);
})

//sends response or error status back to react app
const sendToFront = async (response, res) => {
  if (response.ok) {
    const jsonResponse = await response.json();
    res.json(jsonResponse);
  } else {
    res.status(response.status).send();
  }
}