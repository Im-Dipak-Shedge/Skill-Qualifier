import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <p>Checking session...</p>;
  }

  if (!user) {
    return <p>You are not logged in</p>;
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome, {user.name}</p>
      <p>Email: {user.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
