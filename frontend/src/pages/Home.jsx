import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./../components/Navbar";

function Home() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <p>Checking session...</p>;
  }

  if (!user) {
    return <p>You are not logged in</p>;
  }

  console.log(user);

  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <p>Welcome, {user.name}</p>
      <p>Email: {user.email}</p>

      <img src={user.avatar} alt="User Avatar" width={100} />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
