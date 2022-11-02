import React from "react";
import { useNavigate } from "react-router-dom";

//redirect to login on 404
function PageNotFound() {
  let navigate = useNavigate();

  React.useEffect(() => {
    navigate("/");
  }, [])
}

export default PageNotFound;
