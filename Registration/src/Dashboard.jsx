import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/users/${userID}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userID");
    navigate("/login");
  };

  return user ? (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Dashboard;
