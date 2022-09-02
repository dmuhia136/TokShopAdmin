import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/UsersTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getOrders } from "../../redux/reducers/OrderSlice";
import { getAllRooms } from "../../redux/reducers/RoomSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllShops } from "../../redux/reducers/ShopSlice";
import { getAllProducts } from "../../redux/reducers/ProductSlice";
import { getAllClubs } from "../../redux/reducers/ClubSlice";
import { getUser } from "../../redux/reducers/CurrentUserSlice";
import { getAllUsers } from "../../redux/reducers/UserSlice";
import Card from "../../components/widget/Card";
const Home = () => {
  let token = localStorage.getItem("token");
  let userID = localStorage.getItem("userID");
  console.log(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [user, usersList] = useState([]);
  const [order, ordersList] = useState([]);
  const [room, roomList] = useState([]);
  const [shop, shopList] = useState([]);

  async function getUsers() {
    axios.get("http://34.233.120.213:3000/users", config).then((result) => {
      usersList(result.data);
      console.log("alliid", result.data);
    });
  }
  async function getOrders() {
    axios
      .get("http://34.233.120.213:3000/orders/all/orders", config)
      .then((result) => {
        ordersList(result.data);
        console.log("pdoas", result.data);
      });
  }
  async function getRooms() {
    axios
      .get("http://34.233.120.213:3000/rooms/get/ended/0", config)
      .then((result) => {
        roomList(result.data[0].data);
      });
  }
  async function getShops() {
    axios.get("http://34.233.120.213:3000/shop", config).then((result) => {
      shopList(result.data);
      console.log("asd", result.data);
    });
  }
  useEffect(() => {
    getUsers();
    getRooms();
    getOrders();
    getShops();
  }, []);

  if (token == "") {
    navigate("/login");
  } else {
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Card count={user} title="USERS" />
            <Card count={order} title="ORDERS" />
            <Card count={room} title="ROOMS" />
            <Card count={shop} title="SHOPS" />
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
