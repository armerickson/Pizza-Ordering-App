import React from "react"
import pizzaOptions from "../data/pizzaOptions";

//returns buttons into a button group (in OrderForm) for each category 
//(e.g. size, crust, etc)
function CategoryBtns({ category, setField }) {
  return pizzaOptions[category].map((option, index) =>
    <label
      key={option}
      className="btn btn-outline-primary col-sm-12 col-lg-4"
      onClick={() => setField(category, option)}
    >
      <input
        type="radio"
        name={category}
        id={option}
        autoComplete="off"
        required
      />
      {option}
    </label >
  )
}

export default CategoryBtns;
