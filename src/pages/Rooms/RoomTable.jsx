import "./datatable.scss";
import { userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./single.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from 'moment'

const RoomsTable = () => {
  const [data, setData] = useState(userRows);
  const rooms = useSelector((state) => state.rooms.value[0].data);
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
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Owner</TableCell>
            <TableCell className="tableCell">Room Title</TableCell>
            <TableCell className="tableCell">Speakers</TableCell>
            <TableCell className="tableCell">Audience</TableCell>
            <TableCell className="tableCell">Product Price</TableCell>
            <TableCell className="tableCell">Product discount</TableCell>
            <TableCell className="tableCell">Recording Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.hostIds.forEach((user)=>{
                <p>{user.firstName} {user.lastName}</p>
              })}</TableCell>
              <TableCell className="tableCell">{row.title}</TableCell>
             
              <TableCell className="tableCell">{row.speakerIds.length}</TableCell>
              <TableCell className="tableCell">
                {row.allUsers.length}
              </TableCell>
              <TableCell className="tableCell">{row.productPrice}</TableCell>
              <TableCell className="tableCell">{row.discount}</TableCell>
              <TableCell className="tableCell">{moment(row.activeTime).format("YYYY:MM:DD HH:MM")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomsTable;
