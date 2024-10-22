import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Table,
  Button,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { FaTrash, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);
  const [dept, setDept] = useState("");
  const [status, setStatus] = useState("");

  const capitalizeName = (name) => {
    return name
      .split(".")
      .join(" ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://neural-nexus-backend.onrender.com/api/students/getall", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setLoadingId(id);
    axios
      .delete(
        `https://neural-nexus-backend.onrender.com/api/students/deleteStudent/${id}`
      )
      .then(() => {
        setData(data.filter((item) => item._id !== id));
        setLoadingId(null);
      })
      .catch((err) => {
        console.error("Error deleting record:", err);
        setLoadingId(null);
      });
  };

  const handlePaid = (id) => {
    setLoadingId(id);
    axios
      .put(
        `https://neural-nexus-backend.onrender.com/api/students/editPayment/${id}`
      )
      .then(() => {
        setData(
          data.map((item) =>
            item.dno === id ? { ...item, paymentStatus: true } : item
          )
        );
        setLoadingId(null);
      })
      .catch((err) => {
        console.error("Error marking as paid:", err);
        setLoadingId(null);
      });
  };

  const filteredData = data.filter(
    (item) =>
      item.dno.toLowerCase().includes(search.toLowerCase()) &&
      (dept === "" || item.department === dept) &&
      (status === "" || item.paymentStatus === status)
  );

  const handleDeptChange = (e) => {
    console.log(e.target.value);
    setDept(e.target.value);
  };

  const handlePaidChange = (e) => {
    console.log(typeof e.target.value);
    if (e.target.value === "true") {
      setStatus(true);
    } else if (e.target.value === "false") {
      setStatus(false);
    } else {
      setStatus(e.target.value);
    }
  };

  // Function to download filtered data as Excel file
  const downloadExcel = () => {
    try {
      const filteredStudents = filteredData.map((item, index) => ({
        "S.No": index + 1,
        Name: capitalizeName(item.name),
        "D.No": item.dno,
        Department: item.department.toUpperCase(),
        Year: item.year,
        "Payment Status": item.paymentStatus ? "Paid" : "Pending",
      }));

      // Create worksheet and workbook
      const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

      // Save Excel file with the current date
      XLSX.writeFile(
        workbook,
        `students_${new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}.xlsx`
      );
    } catch (error) {
      setError("Error downloading Excel file. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="#">
            <img
              alt=""
              src="/logoimage.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Dashboard
          </Navbar.Brand>
          <Navbar.Text className="mx-auto">Computer Comrades</Navbar.Text>
          <Button
            variant="outline-light"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Container>
      </Navbar>

      <Container>
        {loading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && (
          <Row className="mb-3">
            <Col className="filterOptions">
              <Form.Group controlId="dept" className="button">
                <Form.Select
                  name="dept"
                  className="select-dept"
                  value={dept}
                  onChange={handleDeptChange}
                >
                  <option value="">Filter by Department</option>
                  <option value="cse">Computer Science and Engineering</option>
                  <option value="it">Information Technology</option>
                  <option value="mech">Mechanical Engineering</option>
                  <option value="aero">Aeronautical Engineering</option>
                  <option value="ece">
                    Electrical and Communication Engineering
                  </option>
                  <option value="eee">
                    Electrical and Electronics Engineering
                  </option>
                  <option value="civil">Civil Engineering</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="status" className="button">
                <Form.Select
                  name="status"
                  className="select-status"
                  value={status}
                  onChange={handlePaidChange}
                >
                  <option value="">Filter by Payment Status</option>
                  <option value="true">paid</option>
                  <option value="false">Pending</option>
                </Form.Select>
              </Form.Group>
              <Form.Control
                type="text"
                placeholder="Search by DNO"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="button"
              />
            </Col>
          </Row>
        )}

        <h4 className="text-center">Total Participants : {data.length}</h4>
        <Button variant="primary" onClick={downloadExcel} className="excel">
          Download Excel
        </Button>

        {!loading && (
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Name</th>
                  <th>D.NO</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{capitalizeName(item.name)}</td>
                    <td>{item.dno}</td>
                    <td>{item.department.toUpperCase()}</td>
                    <td>{item.year}</td>
                    <td style={{ color: item.paymentStatus ? "green" : "red" }}>
                      {item.paymentStatus ? "Paid" : "Pending"}
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(item._id)}
                        className="me-2"
                        disabled={loadingId === item._id} // Disable button while loading
                      >
                        {loadingId === item._id ? (
                          <Spinner as="span" animation="border" size="sm" />
                        ) : (
                          <FaTrash />
                        )}
                      </Button>
                      <Button
                        variant={
                          item.paymentStatus ? "success" : "outline-success"
                        }
                        size="sm"
                        onClick={() => handlePaid(item.dno)}
                        disabled={item.paymentStatus || loadingId === item._id} // Disable button while loading
                      >
                        {loadingId === item._id ? (
                          <Spinner as="span" animation="border" size="sm" />
                        ) : (
                          <FaCheck />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
