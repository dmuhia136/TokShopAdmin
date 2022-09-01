import "./datatable.scss";
import { userRows } from "../../datatablesource";
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
import moment from "moment";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
const ShopTable = () => {
  const [data, setData] = useState(userRows);
  const shops = useSelector((state) => state.shops.value);
  const dispatch = useDispatch();

  async function deleteShop(shopid) {
    try {
      await axios
        .get(`http://34.233.120.213:3000/shop/shop/${shopid}`)
        .then((e) => {
          message.success("Shop deleted");
        });
    } catch (e) {
      console.log(e);
    }
  }
  let token = localStorage.getItem("token");
  let userID = localStorage.getItem("userID");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [shop, shopList] = useState([]);
  async function getShops() {
    axios.get("http://34.233.120.213:3000/shop", config).then((result) => {
      shopList(result.data);
      console.log("asd", result.data);
    });
  }
  useEffect(() => {
    getShops();
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell font-bold">Shop Name</TableCell>
            <TableCell className="tableCell">Location</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shop.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell bg-gray-700">{row.name}</TableCell>
              <TableCell className="tableCell">{row.location}</TableCell>
              <TableCell className="tableCell">{row.description}</TableCell>
              <TableCell className="tableCell">
                <button
                  type="button"
                  id="deleteButton"
                  className="bg-red-500"
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

export default ShopTable;
