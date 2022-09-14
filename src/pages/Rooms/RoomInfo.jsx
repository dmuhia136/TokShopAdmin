import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import React, { useEffect, useState, useMemo, Component } from "react";
import {
  BrowserRouter as Router,
  useParams,
  useLocation,
  withRouter,
} from "react-router-dom";
import { Audio } from "react-loader-spinner";

function RoomInfo() {
  const { id } = useParams();
  console.log("dasd", id);
  const [room, getRoom] = useState([]);
  let token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function getAProducts() {
    await axios
      .get(`http://34.233.120.213:3000/rooms/rooms/${id}`, config)
      .then((result) => {
        console.log("all data", result.data);
        getRoom(result.data);
      });
  }

  useEffect(() => {
    getAProducts();
  }, []);
  if (room == null) {
    return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
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
        </div>
      </div>
    );
  } else {
    return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className=" items-center justify-center rounded shadow-md w-2/3 pl-10 relative pt-10 gap-y-5">
            <div className="flex gap-x-4 ">
              <p>Product name:</p>
              <img
                src="https://thumbs.dreamstime.com/b/product-icon-collection-trendy-modern-flat-linear-vector-white-background-thin-line-outline-illustration-130947207.jpg"
                className="rounded-full h-10 w-10"
              />
            </div>
            <p>Product Id:</p>
            <p>Quantity:</p>
            <p>Owner:</p>
            <p>Shop Name:</p>
            <p>Description:</p>
            <p>Price:</p>
            <p>Status:</p>
            <button className="absolute right-0 top-0 p-1 bg-blue-500 text-white rounded">
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomInfo;
