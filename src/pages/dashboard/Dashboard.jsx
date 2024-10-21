// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Navbar,
//   Table,
//   Button,
//   Form,
//   Row,
//   Col,
//   Spinner,
// } from "react-bootstrap";
// import { FaTrash, FaCheck } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [loadingId, setLoadingId] = useState(null); // Track the loading state for individual actions
//   const [error, setError] = useState(null);

//   const capitalizeName = (name) => {
//     return name
//       .split(".")
//       .join(" ")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   // Fetch data from backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/students/getall")
//       .then((response) => {
//         console.log(response.data);
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data");
//         setLoading(false);
//       });
//   }, []);

//   // Handle delete
//   const handleDelete = (id) => {
//     setLoadingId(id); // Set loadingId to show spinner on the respective button
//     axios
//       .delete(`http://localhost:3000/api/students/deleteStudent/${id}`)
//       .then(() => {
//         setData(data.filter((item) => item._id !== id));
//         setLoadingId(null); // Clear loadingId
//       })
//       .catch((err) => {
//         console.error("Error deleting record:", err);
//         setLoadingId(null); // Clear loadingId
//       });
//   };

//   // Handle marking as paid
//   const handlePaid = (id) => {
//     setLoadingId(id); // Set loadingId to show spinner on the respective button
//     axios
//       .put(`http://localhost:3000/api/students/editPayment/${id}`)
//       .then(() => {
//         setData(
//           data.map((item) =>
//             item.dno === id ? { ...item, paymentStatus: true } : item
//           )
//         );
//         setLoadingId(null); // Clear loadingId
//       })
//       .catch((err) => {
//         console.error("Error marking as paid:", err);
//         setLoadingId(null); // Clear loadingId
//       });
//   };

//   // Filter data based on search query
//   const filteredData = data.filter((item) =>
//     item.dno.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       {/* Navbar */}
//       <Navbar bg="dark" variant="dark" className="mb-4">
//         <Container>
//           <Navbar.Brand href="#">
//             <img
//               alt=""
//               src="/logoimage.png"
//               width="30"
//               height="30"
//               className="d-inline-block align-top"
//             />{" "}
//             Dashboard
//           </Navbar.Brand>
//           <Navbar.Text className="mx-auto">Computer Comrades</Navbar.Text>
//           <Button
//             variant="outline-light"
//             onClick={() => {
//               navigate("/");
//             }}
//           >
//             Logout
//           </Button>
//         </Container>
//       </Navbar>

//       {/* Main Content */}
//       <Container>
//         {/* Loader */}
//         {loading && (
//           <div className="text-center">
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         )}

//         {/* Error Message */}
//         {error && <div className="alert alert-danger">{error}</div>}

//         {/* Search Bar */}
//         {!loading && (
//           <Row className="mb-3">
//             <Col md={{ span: 4, offset: 8 }}>
//               <Form.Control
//                 type="text"
//                 placeholder="Search by DNO"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </Col>
//           </Row>
//         )}

//         {/* Data Table */}
//         {!loading && (
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>DNO</th>
//                 <th>Department</th>
//                 <th>Year</th>
//                 <th>Payment Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((item) => (
//                 <tr key={item._id}>
//                   <td>{capitalizeName(item.name)}</td>
//                   <td>{item.dno}</td>
//                   <td>{item.department.toUpperCase()}</td>
//                   <td>{item.year}</td>
//                   <td style={{ color: item.paymentStatus ? "green" : "red" }}>
//                     {item.paymentStatus ? "Paid" : "Pending"}
//                   </td>
//                   <td>
//                     <Button
//                       variant="outline-danger"
//                       size="sm"
//                       onClick={() => handleDelete(item._id)}
//                       className="me-2"
//                       disabled={loadingId === item._id} // Disable button while loading
//                     >
//                       {loadingId === item._id ? (
//                         <Spinner as="span" animation="border" size="sm" />
//                       ) : (
//                         <FaTrash />
//                       )}
//                     </Button>
//                     <Button
//                       variant={
//                         item.paymentStatus ? "success" : "outline-success"
//                       }
//                       size="sm"
//                       onClick={() => handlePaid(item.dno)}
//                       disabled={item.paymentStatus || loadingId === item._id} // Disable button while loading
//                     >
//                       {loadingId === item._id ? (
//                         <Spinner as="span" animation="border" size="sm" />
//                       ) : (
//                         <FaCheck />
//                       )}
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default Dashboard;
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);

  const capitalizeName = (name) => {
    return name
      .split(".")
      .join(" ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Fetch data from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/students/getall", {
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

  // Handle delete
  const handleDelete = (id) => {
    setLoadingId(id);
    axios
      .delete(`http://localhost:3000/api/students/deleteStudent/${id}`)
      .then(() => {
        setData(data.filter((item) => item._id !== id));
        setLoadingId(null);
      })
      .catch((err) => {
        console.error("Error deleting record:", err);
        setLoadingId(null);
      });
  };

  // Handle marking as paid
  const handlePaid = (id) => {
    setLoadingId(id);
    axios
      .put(`http://localhost:3000/api/students/editPayment/${id}`)
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

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.dno.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Navbar */}
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

      {/* Main Content */}
      <Container>
        {/* Loader */}
        {loading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Search Bar */}
        {!loading && (
          <Row className="mb-3">
            <Col md={{ span: 4, offset: 8 }}>
              <Form.Control
                type="text"
                placeholder="Search by DNO"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>
        )}

        {/* Data Table */}
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
