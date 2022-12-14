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
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const OrderTable = () => {
  const [data, setData] = useState(userRows);
  const orders = useSelector((state) => state.orders.value);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

 
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [order, orderList] = useState([]);
  async function deleteShop(orderid) {


    try {
      await axios
        .delete(`http://34.233.120.213:3000/orders/orders/${orderid}`, config)
        .then((e) => {
          // message.success("Shop deleted");
          navigate("/orders");
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
          {order.length == 0 ? (
            <div className=" ">
              <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </div>
          ) : (
            order.map((row) => (
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
                <TableCell
                  className={
                    row.status == "delivered"
                      ? "tableCell text-green-800"
                      : "tableCell text-yellow-600"
                  }
                >
                  {row.status}
                </TableCell>
                <TableCell className="tableCell space-x-2">
                  <button
                    className="rounded bg-blue-300 shadow-xl p-2"
                    onClick={() => navigate(`/orders/${row._id}`)}
                  >
                    View Order
                  </button>
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
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
