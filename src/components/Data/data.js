import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Data/data.css";

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://urlshortener-backend-p88f.onrender.com/url/all",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShortUrlClick = async (e, shortUrl) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://urlshortener-backend-p88f.onrender.com/url/${shortUrl}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const originalUrl = response.data;
      window.open(originalUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="data">
      <div className="heading">
        <h1>URL SHORTENER</h1>
      </div>
      <div className="table-container">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.NO</th>
              <th scope="col">originalUrl</th>
              <th scope="col">shortUrl</th>
              <th scope="col">createdAt</th>
              <th scope="col">count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.originalUrl}</td>
                <td>
                  <a
                    href={item.originalUrl}
                    target="_new"
                    onClick={(e) => handleShortUrlClick(e, item.shortUrl)}
                  >
                    {item.shortUrl}
                  </a>
                </td>
                <td>{item.createdAt}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Data;
