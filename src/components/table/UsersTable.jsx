import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";

const List = () => {
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };


  const users = useSelector((state) => state.allusers.value);
  console.log('====================================');
  console.log("my users",users);
  console.log('====================================');
  
  return (
<div>Hello</div>
    // <TableContainer component={Paper} className="table">
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell className="tableCell">First Name</TableCell>
    //         <TableCell className="tableCell">Last Name</TableCell>
    //         <TableCell className="tableCell">Profile Photo</TableCell>
    //         <TableCell className="tableCell">Followers</TableCell>
    //         <TableCell className="tableCell">Following</TableCell>
    //         <TableCell className="tableCell">Username</TableCell>
    //         <TableCell className="tableCell">Shop</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {users.map((row) => (
    //         <TableRow key={row._id}>
    //           <TableCell className="tableCell">{row.firstname}</TableCell>
    //           <TableCell className="tableCell">{row.lastname}</TableCell>
    //           <TableCell className="tableCell">
    //             <div className="cellWrapper">
    //               <img src={row.profilePhoto} alt="" className="image" />
    //               {row.email}
    //             </div>
    //           </TableCell>
    //           <TableCell className="tableCell">
    //             {row.followers.length}
    //           </TableCell>
    //           <TableCell className="tableCell">
    //             {row.following.length}
    //           </TableCell>
    //           <TableCell className="tableCell">{row.userName}</TableCell>
    //           <TableCell className="tableCell">{}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default List;
