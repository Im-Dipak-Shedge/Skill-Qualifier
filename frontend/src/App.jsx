import AuthPage from "./pages/AuthPage";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import VerifyEmail from "./pages/VerifyEmail";
import { useAuth } from "./contexts/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <AuthPage />}
        />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="*" element={<PageNotFound />} />
        {/* email verification route */}
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
