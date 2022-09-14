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

const ProductInfo = (props) => {
  const { id } = useParams();
  console.log("dasd", id);
  const [product, getProduct] = useState([]);
  let token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function getAProducts() {
    await axios
      .get(`http://34.233.120.213:3000/products/products/${id}`, config)
      .then((result) => {
        console.log("all data", result.data);
        getProduct(result.data);
      });
  }

  useEffect(() => {
    getAProducts();
  }, []);
  if (product.length == 0) {
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
  }else{
    return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className=" rounded shadow-md w-2/3  relative p-10 pt-10 gap-y-5">
          <div className="justify-center md:pl-10 pl-24 sm:pl-5 gap-x-4 ">
            <p
              className="text-bold text-gray-700 "
              style={{ margin: " 0 auto" }}
            >
              Product name:{product.name}
            </p>
            <img
              src={
                product.images.length !== 0
                  ? product.images[0]
                  : "https://thumbs.dreamstime.com/b/product-icon-collection-trendy-modern-flat-linear-vector-white-background-thin-line-outline-illustration-130947207.jpg"
              }
              className="rounded w-48 pt-10 "
            />
          </div>
          <div className="grid grid-cols-2 pt-10 text-blue-800 dark:text-white font-bold">
            <p>Quantity: {product.quantity}</p>
            <p>Owner: {product.ownerId.userName}</p>
            <p>Shop Name: {product.shopId.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>
              Status:{" "}
              {product.available == true ? "Available" : "Not Available"}
            </p>
          </div>

          <button className="absolute right-0 top-0 p-1 bg-blue-500 text-white rounded">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
  }
  
};

export default ProductInfo;
