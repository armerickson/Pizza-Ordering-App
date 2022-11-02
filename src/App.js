import React, { useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import PageNotFound from './screens/PageNotFound';

function App() {
  const [token, setToken] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container-fluid m-0 p-0">
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route
              path="/home"
              element={<Home setToken={setToken} token={token} />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
