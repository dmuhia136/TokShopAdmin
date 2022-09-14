import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import {
  BrowserRouter as Router,
  useParams,
} from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserTransactions from "./UserTransactions";

import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const Single = (props) => {
  const navigateTo = useNavigate();

  const { id } = useParams();
  console.log("dasd", id);
  const navigate = useNavigate();

  const [user, userState] = useState([]);
  let token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function getUserData() {
    await axios
      .get(`http://34.233.120.213:3000/users/${id}`, config)
      .then((result) => {
        console.log(result.data);
        userState(result.data);
      });
  }
  useEffect(() => {
    getUserData();
  }, []);
  if (user.length == 0) {
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
  }
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div
              className="editButton"
              onClick={() => navigateTo(`/edituser/${user._id}`)}
            >
              Edit
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={
                  user.profilePhoto !== ""
                    ? user.profilePhoto
                    : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                }
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">
                  {user.firstName} {user.lastName}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Mpesa Number:</span>
                  <span className="itemValue">{user.mpesaNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Wallet:</span>
                  <span className="itemValue">{user.wallet}</span>
                </div>
                <div className="detailItem rounded-full">
                  <span className="itemKey">Account Status:</span>
                  <span className="itemValue">{user.accountDisabled}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
            {/* <UserTransactions userId={id} /> */}
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <UserTransactions userId={id} />
        </div>
      </div>
    </div>
  );
};

export default Single;
