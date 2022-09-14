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

function ShopInfo() {
  const { id } = useParams();
  console.log("dasd", id);
  const [shop, getShop] = useState([]);
  let token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function getAProducts() {
    await axios
      .get(`http://34.233.120.213:3000/shop/shop/${id}`, config)
      .then((result) => {
        console.log("all data", result.data);
        getShop(result.data);
      });
  }

  useEffect(() => {
    getAProducts();
  }, []);
  if (shop.length == 0) {
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
    <div className="single selection:">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className=" items-center text-gray-700 text-lg justify-center rounded shadow-md w-2/3 pl-10 relative pt-10 space-y-5">
          <p>Shop name: {shop.name}</p>
          <div className="flex gap-x-4 ">
            <img
              src={
                shop.image != ""
                  ? shop.image
                  : "https://thumbs.dreamstime.com/b/product-icon-collection-trendy-modern-flat-linear-vector-white-background-thin-line-outline-illustration-130947207.jpg"
              }
              className="rounded h-48 "
            />
          </div>
          <p>Location: {shop.location}</p>
          <p>
            Owner: {shop.userId.firstName} {shop.userId.lastName}
          </p>
          <p>Status: {shop.open == true ? "Open" : "Closed"}</p>
        </div>
      </div>
    </div>
  );
}

export default ShopInfo;
