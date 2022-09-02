import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./single.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const OrderTable = () => {
  const [data, setData] = useState(userRows);
  const orders = useSelector((state) => state.orders.value);
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
  const percentage = 66;
  let token = localStorage.getItem("token");
  let userID = localStorage.getItem("userID");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [order, orderList] = useState([]);
  async function deleteShop(orderid, e) {
    e.preventDefault();
    try {
      await axios
        .delete(`http://34.233.120.213:3000/orders/orders/${orderid}`, config)
        .then((e) => {
          // message.success("Shop deleted");
          console.log("====================================");
          console.log(e);
          console.log("====================================");
        });
    } catch (e) {
      console.log(e);
    }
  }
  async function getOrders() {
    axios
      .get("http://34.233.120.213:3000/orders/all/orders", config)
      .then((result) => {
        orderList(result.data);
        console.log("pdoas", result.data);
      });
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Customer Name</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Shipping Address</TableCell>
            <TableCell className="tableCell">Subtotal</TableCell>
            <TableCell className="tableCell">Order Status</TableCell>
            <TableCell className="tableCell">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {order.length==0?<div style={{ width: 200, height: 200,justifyContent: "center"  }}><CircularProgressbar  value={percentage} text={`${percentage}%`} /></div >: order.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">
                {row.customerId.firstName} {row.customerId.lastName}
              </TableCell>
              <TableCell className="tableCell">{row.quantity}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {JSON.stringify(row.shippingId.city)}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.subTotal}</TableCell>
              <TableCell className="tableCell">{row.status}</TableCell>
              <TableCell className="tableCell">
                <button
                  type="button"
                  id="deleteButton"
                  className="bg-red-600 p-2 rounded text-white"
                  onClick={() => {
                    deleteShop(row._id);
                  }}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
