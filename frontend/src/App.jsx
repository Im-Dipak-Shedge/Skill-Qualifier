import AuthPage from "./pages/AuthPage";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import { useAuth } from "./contexts/AuthContext";
function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <AuthPage />}
        />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
