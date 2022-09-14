import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../../redux/reducers/CurrentUserSlice";
import { useState, useEffect } from "react";

const UserTransactions = ({ userId }) => {
  const [transaction, getTransaction] = useState([]);
  let token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function getAllTransactions() {
    await axios
      .get(`http://34.233.120.213:3000/transactions//${userId}`, config)
      .then((result) => {
        console.log("all data", result.data);
        getTransaction(result.data);
      });
  }

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">From</TableCell>
            <TableCell className="tableCell">To</TableCell>
            <TableCell className="tableCell">Transaction type</TableCell>
            <TableCell className="tableCell">Reason</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transaction.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">
                {row.from.firstName} {row.from.lastName}
              </TableCell>
              <TableCell className="tableCell">
                {row.to.firstName} {row.to.lastName}
              </TableCell>
              <TableCell className="tableCell">{row.type}</TableCell>
              <TableCell className="tableCell">{row.reason}</TableCell>
              <TableCell className="tableCell">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTransactions;
