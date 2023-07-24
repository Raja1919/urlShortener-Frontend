import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "../DashBoard/dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Daily URL Creation Count",
      color: "black", 
      font: {
        size: "30",
        weight: "bold",
      },
    },
  },
};



const monthlyOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly URL Creation Count",
      color: "black",
      font: {
        size: "30",
        weight: "bold",
        
      },
    },
  },
};

const Dashboard = () => {
  const [dailyCounts, setDailyCounts] = useState([]);
  const [monthlyCounts, setMonthlyCounts] = useState([]);

  useEffect(() => {
    fetchDayCounts();
    fetchMonthCounts();
  }, []);

  const fetchDayCounts = async () => {
    const token = localStorage.getItem("token");

    try {
      const dailyResponse = await axios.get(
        "https://urlshortener-backend-p88f.onrender.com/url/counts/day",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setDailyCounts(dailyResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMonthCounts = async () => {
    const token = localStorage.getItem("token");

    try {
      const monthlyResponse = await axios.get(
        "https://urlshortener-backend-p88f.onrender.com/url/counts/month",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setMonthlyCounts(monthlyResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    labels: dailyCounts.map((item) => item.date),
    datasets: [
      {
        label: "Count",
        data: dailyCounts.map((item) => item.count),
        borderColor: "red",
        backgroundColor: "blue",
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        barThickness: 50,
      },
    ],
  };

  const monthlyData = {
    labels: monthlyCounts.map((item) => item.yearMonth),
    datasets: [
      {
        label: "Count",
        data: monthlyCounts.map((item) => item.count),
        borderColor: "red",
        backgroundColor: "green",
        barPercentage: 0.4,
        categoryPercentage: 0.2,
      },
    ],
  };

  return (
    <div className="chart">
      <div className="heading">
        <h1>Dashboard</h1>
      </div>
      <div className="daily">
        <Bar options={options} data={data} />
      </div>
      <div className="monthly">
        <Bar options={monthlyOptions} data={monthlyData} />
      </div>
    </div>
  );
};

export default Dashboard;
