import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home2 from "./pages/Home2";
import AdminPanel from "./pages/AdminPanel";
import UserPanel from "./pages/UserPanel";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Loginpage";
import PrivateRoute from "./HOC/PrivateRoute";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Home />

      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserPanel />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
