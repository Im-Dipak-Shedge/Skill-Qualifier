import AuthPage from "./pages/AuthPage";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import VerifyEmail from "./pages/VerifyEmail";
import { useAuth } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import UploadResume from "./pages/UploadResume";
import ManualEntry from "./pages/ManualEntry";

function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white flex-shrink-0">
        <div className="relative flex items-center justify-center animate-spin">
          <div className="absolute flex flex-col justify-between h-16 rotate-0">
            <div className="h-5 w-[6px] rounded-full bg-green-600 "></div>
            <div className="h-5 w-[6px] rounded-full bg-green-500 "></div>
          </div>
          <div className="absolute flex flex-col justify-between h-16 rotate-45">
            <div className="h-5 w-[6px] rounded-full bg-green-600 "></div>
            <div className="h-5 w-[6px] rounded-full bg-green-500 "></div>
          </div>
          <div className="absolute flex flex-col justify-between h-16 rotate-90">
            <div className="h-5 w-[6px] rounded-full bg-green-600 "></div>
            <div className="h-5 w-[6px] rounded-full bg-green-500 "></div>
          </div>
          <div className="absolute flex flex-col justify-between h-16 -rotate-45">
            <div className="h-5 w-[6px] rounded-full bg-green-600 "></div>
            <div className="h-5 w-[6px] rounded-full bg-green-500 "></div>
          </div>
        </div>
      </div>
    );
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
        <Route path="/upload-resume" element={<UploadResume />} />
        <Route path="/manual-entry" element={<ManualEntry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
