import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/register" element={<Login></Login>} />
          <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
