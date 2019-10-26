import React, { useState, useEffect } from "react";

export const AddForm = () => {
  const [formState, setFormState] = useState("select-category");
  switch (formState) {
    case "select-category":
      return (
        <form onSubmit="">
          <label>
            select category
          </label>
          <select>
             <option value = "discount"> Discount </option>
             <option value = "event"> Event </option>
             <option value = "incident"> Incident </option>
          </select>
          <br></br>
          <input type = "submit" value = "Next"></input>
        </form>
      );
    case "select-subtype":
      return (
        <form onSubmit="">
          <label>
            select discount type
          </label>
          <select>
             <option value = "discount"> Foods and Beverages </option>
             <option value = "event"> Stores </option>
             <option value = "incident"> Attractions </option>
             <option value = "incident"> Hotels </option>
          </select>
          <br></br>
          <input type = "submit" value = "Next"></input>
        </form>
        <form onSubmit="">
        <label>
          select event type
        </label>
        <select>
           <option value = "discount"> Markets </option>
           <option value = "event"> Music </option>
           <option value = "incident"> Parade </option>
           <option value = "incident"> Sports </option>
        </select>
        <br></br>
        <input type = "submit" value = "Next"></input>
      </form>
      <form onSubmit="">
      <label>
        select incident type
      </label>
      <select>
         <option value = "discount"> Traffic </option>
         <option value = "event"> Gathering </option>
         <option value = "incident"> Fire </option>
         <option value = "incident"> Gas Leakage </option>
         <option value = "incident"> Air Quality </option>
      </select>
      <br></br>
      <input type = "submit" value = "Next"></input>
    </form>
      );
    case "enter-description":
      return (
        <form>
          <label>
            The description: 
          </label>
          <input type = "text" name = "description"></input>
          <input type = "submit" value = "Next"></input>
        </form>
      );
    case "submit":
      return null;
    default:
      return null;
  }
};
