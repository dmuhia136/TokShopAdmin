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
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const ProductTable = () => {
  const navigateTo = useNavigate();
  const [data, setData] = useState(userRows);
  const products = useSelector((state) => state.product.value);
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
  let token = localStorage.getItem("token");
  let userID = localStorage.getItem("userID");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [product, productList] = useState([]);
  async function deleteShop(orderid) {
    try {
      await axios
        .delete(
          `http://34.233.120.213:3000/products/products/${orderid}`,
          config
        )
        .then((e) => {
          // message.success("Shop deleted");
        });
    } catch (e) {
      console.log(e);
    }
  }
  async function getProducts() {
    axios.get("http://34.233.120.213:3000/products", config).then((result) => {
      productList(result.data);
      console.log(result.data);
    });
  }
  useEffect(() => {
    getProducts();
  }, []);
  const percentage = 66;

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Product Name</TableCell>
            <TableCell className="tableCell">Product Price</TableCell>
            <TableCell className="tableCell">Product Image</TableCell>
            <TableCell className="tableCell">Product Quantity</TableCell>
            <TableCell className="tableCell">Owner</TableCell>
            <TableCell className="tableCell">Product Category</TableCell>
            <TableCell className="tableCell">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.length == 0 ? (
            <div className="">
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
            product.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row.name}</TableCell>
                <TableCell className="tableCell">{row.price}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row.images[0]} alt="" className="image" />
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.quantity}</TableCell>
                <TableCell className="tableCell">
                  {row.ownerId.userName}
                </TableCell>
                <TableCell className="tableCell">{row.categories[0]}</TableCell>
                <TableCell className="tableCell space-x-5 md:flex flex">
                  <button
                    className="rounded bg-blue-300 shadow-xl p-2"
                    onClick={() => navigateTo(`/products/${row._id}`)}
                  >
                    View Product
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

export default ProductTable;
