import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// 🧩 Import all components
import Home from "./components/Home";
import Service from "./components/Service";
import About from "./components/About";
import Registeration from "./RegisterationForm/Registeration";
import AddItem from "./RegisterationForm/AddItem";
import PhotoUpload from "./components/PhotoUpload";
import UploadPhoto from "./Features/UploadPhoto";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Protected Routes (require login) */}
          <Route
            path="/service"
            element={
              <PrivateRoute>
                <Service />
              </PrivateRoute>
            }
          />

          {/* 🧾 Fixed Registration Page Route */}
          <Route
            path="/service/registration"
            element={
              <PrivateRoute>
                <Registeration />
              </PrivateRoute>
            }
          />

          <Route
            path="/add-item"
            element={
              <PrivateRoute>
                <AddItem />
              </PrivateRoute>
            }
          />

          <Route
            path="/photo-upload"
            element={
              <PrivateRoute>
                <PhotoUpload />
              </PrivateRoute>
            }
          />

          <Route
            path="/photo"
            element={
              <PrivateRoute>
                <UploadPhoto />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
