import { useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Spinner, Button, Modal } from "react-bootstrap";

function Login() {
  // Initialize state for form inputs
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  // checking the path
  console.log(location.pathname.includes("register"));

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, password } = formData;

    if (!id || !password) {
      alert("Please fill in all fields and select your interest.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${
          location.pathname.includes("register")
            ? "https://neural-nexus-backend.onrender.com/api/admin/register"
            : "https://neural-nexus-backend.onrender.com/api/admin/login"
        }`,
        {
          mobileNumber: formData.id,
          password: formData.password,
        }
      );

      setLoading(false);
      if (response.data.message === "created") {
        navigate("/");
      } else {
        localStorage.setItem("token", response.data.admin.password);
        navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="containerr">
      <div className="content">
        {/* Form Section */}
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            {!location.pathname.includes("register") ? (
              <h2>Computer Comrades Admin Login</h2>
            ) : (
              <h2>Create a New Admin</h2>
            )}

            <label>
              Admin ID :
              <input
                type="text"
                name="id"
                maxLength={10}
                minLength={10}
                value={formData.id}
                onChange={handleInputChange}
                placeholder="Enter Admin Id"
                required
              />
            </label>

            <label>
              Password :
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Admin Password"
                required
              />
            </label>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : location.pathname.includes("register") ? (
                "Register"
              ) : (
                "Login"
              )}
            </button>
          </form>
          <br></br>
          {location.pathname.includes("register") ? (
            <Link to={"/"}>Go Back ←</Link>
          ) : (
            <Link to={"/register"}>Create an Account</Link>
          )}
        </div>

        {/* Image Section */}
        <div className="image-section">
          <img src="/logoimage.png" alt="Poster" />
        </div>
      </div>
    </div>
  );
}

export default Login;
