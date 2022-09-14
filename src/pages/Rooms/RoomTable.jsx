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
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const RoomsTable = () => {
  const [data, setData] = useState(userRows);
  const navigateTo = useNavigate();
  let token = localStorage.getItem("token");
  let userID = localStorage.getItem("userID");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [room, roomList] = useState([]);

  async function deleteRoom(roomid, event) {
    // event.preventDefault();
    try {
      await axios
        .delete(`http://34.233.120.213:3000/rooms/rooms/${roomid}`, config)
        .then((e) => {
          // message.success("Shop deleted");
          console.log("====================================");
          console.log("deleted", e.response.data);
          console.log("====================================");
        });
    } catch (e) {
      console.log(e);
    }
  }
  async function getRooms() {
    axios
      .get("http://34.233.120.213:3000/rooms/get/ended/0", config)
      .then((result) => {
        roomList(result.data[0].data);
      });
  }
  useEffect(() => {
    getRooms();
  }, []);

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
            <TableCell className="tableCell">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {room.length == 0 ? (
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
            room.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">
                  {row.ownerId[0].firstName}
                </TableCell>
                <TableCell className="tableCell">
                  {row.title == "" ? "No room title" : row.title}
                </TableCell>

                <TableCell className="tableCell">
                  {row.speakerIds.length}
                </TableCell>
                <TableCell className="tableCell">
                  {row.allUsers.length}
                </TableCell>
                <TableCell className="tableCell">{row.productPrice}</TableCell>
                <TableCell className="tableCell">
                  {row.discount == null ? "No discount" : row.discount}
                </TableCell>
                <TableCell className="tableCell">
                  {moment(row.activeTime).format("YYYY:MM:DD HH:MM")}
                </TableCell>
                <TableCell className="tableCell space-x-5 md:flex flex">
                  <button
                    className="rounded bg-blue-300 shadow-xl p-2"
                    onClick={() => navigateTo(`/rooms/${row._id}`)}
                  >
                    View Room
                  </button>

                  <button
                    type="button"
                    id="deleteButton"
                    className="bg-red-600 p-2 rounded text-white"
                    onClick={() => {
                      deleteRoom(row._id);
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

export default RoomsTable;
