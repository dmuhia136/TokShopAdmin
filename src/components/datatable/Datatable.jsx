import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../table/table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const Datatable = () => {
  const [data, setData] = useState(userRows);
  let users;
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const [user, userList] = useState([]);
  let token = localStorage.getItem("token");
  let userID = localStorage.getItem("userID");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  async function getUsers() {
    axios.get("http://34.233.120.213:3000/users", config).then((result) => {
  
      userList(result.data);
     
 
    });
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">First Name</TableCell>
            <TableCell className="tableCell">Last Name</TableCell>
            <TableCell className="tableCell">Profile Photo</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Followers</TableCell>
            <TableCell className="tableCell">Following</TableCell>
            <TableCell className="tableCell">Username</TableCell>
            <TableCell className="tableCell">Shop</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {user.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.firstName}</TableCell>
              <TableCell className="tableCell text-bold">
                {row.lastName == "" ? "No last name" : row.lastName}
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img
                    src={
                      row.profilePhoto == ""
                        ? "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                        : row.profilePhoto
                    }
                    alt=""
                    className="image"
                  />
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">
                {row.followers.length}
              </TableCell>
              <TableCell className="tableCell">
                {row.following.length}
              </TableCell>
              <TableCell className="tableCell">{row.userName}</TableCell>
              <TableCell className="tableCell">{row.shopId==null?"No shop":row.shopId.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Datatable;
