import React, { useState, useEffect } from "react";

export const AddForm = () => {
  const [formState, setFormState] = useState("select-category");
  switch (formState) {
    case "select-category":
      return null;
    case "select-subtype":
      return null;
    case "enter-description":
      return null;
    case "submit":
      return null;
    default:
      return null;
  }
};
