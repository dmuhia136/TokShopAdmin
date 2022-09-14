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
import { useDispatch } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
const ShopTable = () => {
  const navigateTo = useNavigate();
  const [data, setData] = useState(userRows);
  const shops = useSelector((state) => state.shops.value);
  const dispatch = useDispatch();

  async function deleteShop(shopid) {
    try {
      await axios
        .get(`http://34.233.120.213:3000/shop/shop/${shopid}`)
        .then((e) => {});
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
  const percentage = 66;

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell font-bold">Shop Name</TableCell>
            <TableCell className="tableCell">Location</TableCell>
            <TableCell className="tableCell  overflow-ellipsis w-25">
              Description
            </TableCell>
            <TableCell className="tableCell">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shop.length == 0 ? (
            <div className=" rounded shadow-md w-2/3  relative p-10 pt-10 gap-y-5">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
            </div>
          ) : (
            shop.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell ">{row.name}</TableCell>
                <TableCell className="tableCell">{row.location}</TableCell>
                <TableCell className="tableCell w-48">{row.description}</TableCell>
                <TableCell className="tableCell space-x-5 md:flex flex">
                  <button
                    className="rounded bg-blue-300 shadow-xl p-2"
                    onClick={() => navigateTo(`/shops/${row._id}`)}
                  >
                    View Shop
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

export default ShopTable;
