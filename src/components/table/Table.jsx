import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getTransactions } from "../../redux/reducers/TransactionSlice";

const List = () => {
  const dispatch=useDispatch();
  let token = localStorage.getItem('token');
  console.log(token);
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  useEffect(()=>{
    axios.get("http://34.233.120.213:3000/transactions",config).then((result)=>{
      dispatch(getTransactions(result.data))
    },[])
  })
  
const users=useSelector((state)=>state.allusers.value);
console.log('====================================');
console.log("users",users);
console.log('====================================');

  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">First Name</TableCell>
            <TableCell className="tableCell">Last Name</TableCell>
            <TableCell className="tableCell">Profile Photo</TableCell>
            <TableCell className="tableCell">Followers</TableCell>
            <TableCell className="tableCell">Following</TableCell>
            <TableCell className="tableCell">Username</TableCell>
            <TableCell className="tableCell">Shop</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.firstname}</TableCell>
              <TableCell className="tableCell">{row.lastname}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.profilePhoto} alt="" className="image" />
                  {row.email}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.followers.length}</TableCell>
              <TableCell className="tableCell">{row.following.length}</TableCell>
              <TableCell className="tableCell">{row.userName}</TableCell>
              <TableCell className="tableCell">{}</TableCell>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
