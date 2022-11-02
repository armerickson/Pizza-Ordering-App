<!-- ABOUT THE PROJECT -->
## About The Project

A pizza ordering application that interfaces with the [order-pizza-api](https://order-pizza-api.herokuapp.com/api/ui/)

Utilizes a Node/Express server to proxy requests to the api and avoid CORS issues

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[React.js](https://reactjs.org/)

[Express/Node](https://expressjs.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/armerickson/Pizza-Ordering-App.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. run Express proxy in `/api-proxy/server.js`
   ```js
   node server.js
   ```
4. run React app in root folder
    ```js
    npm start
    ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- Move PizzaOptions.json onto the server
- Refactor redundant code (such as in fetch calls to server)
- move certain states to useEffect to avoid prop drilling
- Further visual enhancements
- Remove hardcoded data such as number of tables
- more!


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ATTRIBUTIONS -->
## Attributions

<a href="https://www.flaticon.com/free-icons/pizza" title="pizza icons">Pizza icons created by Freepik - Flaticon</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

