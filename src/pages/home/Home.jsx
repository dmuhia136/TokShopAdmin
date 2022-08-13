import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/UsersTable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { getOrders } from "../../redux/reducers/OrderSlice";
import { getAllRooms } from "../../redux/reducers/RoomSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllShops } from "../../redux/reducers/ShopSlice";
import { getAllProducts } from "../../redux/reducers/ProductSlice";
import { getAllClubs } from "../../redux/reducers/ClubSlice";
import { getUser } from "../../redux/reducers/CurrentUserSlice";
import { getAllUsers } from "../../redux/reducers/UserSlice";

const Home = () => {
  let token = localStorage.getItem("token");
  let userID = localStorage.getItem("userID");
  console.log(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if (token == "") {
    navigate("/login");
  } else {
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
