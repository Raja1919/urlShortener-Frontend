// Urlshort.js

import React, { useState } from "react";
import axios from "axios";

const Urlshort = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // Get the authentication token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }

      // Make a POST request to the backend to create a short URL
      const response = await axios.post(
        "https://urlshortener-backend-p88f.onrender.com/url/create",
        {
          originalUrl,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
        window.alert("created successfully")
      // Clear the input field and handle successful response
      setOriginalUrl("");
    } catch (error) {
      setError("Error: Unable to create short URL.");
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>URL SHORTENER</h1>
      </div>

      <form className="input-group" onSubmit={handleAdd}>
        <input
          type="text"
          className="form-control"
          placeholder="Paste Your Url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button className="btn btn-success" type="submit" id="button-addon2">
          Submit
        </button>
      </form>

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Urlshort;
