import "./app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./authentication/ProtectedRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login_register/Login";
import Register from "./pages/login_register/Register";
import Account from "./pages/account/Account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" limit={1} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
