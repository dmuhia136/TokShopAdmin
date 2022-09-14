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
import { useNavigate } from "react-router-dom";

const OrderInfo = (props) => {
  const { id } = useParams();
  console.log("dasd", id);
  const [order, getOrders] = useState([]);
  const [status, setStatus] = useState("");
  let token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function getAllTransactions() {
    await axios
      .get(`http://34.233.120.213:3000/orders/orders/${id}`, config)
      .then((result) => {
        console.log("all dataaa", result.data);
        getOrders(result.data);
      });
  }
  const datas = {
    status: status,
  };
  const navigate = useNavigate();

  async function changeStatus() {
    console.log("dasd", datas);
    await axios.put(
      `http://34.233.120.213:3000/orders/orders/${id}`,
      datas,
      config
    );
    navigate("/orders");

  }

  useEffect(() => {
    getAllTransactions();
  }, []);
  if (order.length === 0) {
    return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className=" rounded shadow-md w-2/3  relative p-10 pt-10 space-y-15">
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
          <div className=" items-center justify-center text-gray-700 space-y-10 font-bold rounded shadow-md w-2/3 pl-10 relative pt-10 gap-y-24">
            <div className="flex gap-x-4 ">
              <div className="rounded-lg hover:shadow-lg p-5 space-y-10 items-center ">
                <div className="pl-5">
                  <img
                    src={
                      order.itemId.productId.images[0] !== ""
                        ? order.itemId.productId.images[0]
                        : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                    }
                    className="rounded h-24 shadow-xl "
                  />
                </div>

                <p>Product name:{order.itemId.productId.name}</p>
              </div>
            </div>
            <p>Quantity: {order.quantity}</p>
            <p>Shipping Address: {order.shippingId.name}</p>
            <p>
              Owner:{order.itemId.productId.ownerId.firstName}
              {order.itemId.productId.ownerId.lastName}
            </p>
            <p>
              Order Status:
              <span
                className={
                  order.status == "pending"
                    ? "text-yellow-500 font-bold text-lg"
                    : "text-green-500 font-bold text-lg"
                }
              >
                {order.status.toUpperCase() }
              </span>
            </p>
            <p>Order total: {order.totalCost} </p>
            <div className="absolute right-0 top-0 space-y-5">
              <button
                onClick={() => changeStatus()}
                className="p-1 bg-blue-500 text-white rounded"
              >
                Change Order Status
              </button>
              <div>
                <select
                  className="rounded bg-green-400 text-white"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option >{order.status}</option>
                  <option value="pending" className="bg-red-500 text-black">
                    Pending
                  </option>
                  <option value="delivered" className="bg-green-500 text-black">
                    Delivered
                  </option>
                </select>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default OrderInfo;
