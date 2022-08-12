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
  // async function fetchOrders() {
  //   await axios
  //     .get("http://34.233.120.213:3000/orders/all/orders", config)
  //     .then((result) => {
  //       dispatch(getOrders(result.data));
  //     });
  // }
  // async function getRooms() {
  //   await axios
  //     .get("http://34.233.120.213:3000/rooms/get/ended/0", config)
  //     .then((result) => {
  //       dispatch(getAllRooms(result.data));
  //     });
  // }
  // async function getShops() {
  //   await axios
  //     .get("http://34.233.120.213:3000/shop", config)
  //     .then((result) => {
  //       dispatch(getAllShops(result.data));
  //     });
  // }
  // async function getProducts() {
  //   await axios
  //     .get("http://34.233.120.213:3000/products", config)
  //     .then((result) => {
  //       dispatch(getAllProducts(result.data));
  //     });
  // }
  // async function getClubs() {
  //   await axios
  //     .get("http://34.233.120.213:3000/club/", config)
  //     .then((result) => {
  //       dispatch(getAllClubs(result.data));
  //     });
  // }

  // async function getClubs() {
  //   await axios
  //     .get("http://34.233.120.213:3000/club/", config)
  //     .then((result) => {
  //       dispatch(getAllClubs(result.data));
  //     });
  // }
  // async function getUserData() {
  //   await axios
  //     .get(`http://34.233.120.213:3000/users/${userID}`, config)
  //     .then((result) => {
  //       dispatch(getUser(result.data));
  //     });
  // }
  // async function getUsers() {
  //   axios.get("http://34.233.120.213:3000/users", config).then((result) => {
  //     console.log("====================================");
  //     console.log(result.data);
  //     console.log("====================================");
  //     dispatch(getAllUsers(result.data));
  //   });
  // }

  // useEffect(() => {
  //   fetchOrders();
  //   getRooms();
  //   getProducts();
  //   getShops();
  //   getClubs();
  //   getUserData();
  //   getUsers();
  // }, []);

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
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
