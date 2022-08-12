import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { currentUser } from "../../redux/reducers/CurrentUserSlice";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../redux/reducers/OrderSlice";
import { getAllRooms } from "../../redux/reducers/RoomSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllShops } from "../../redux/reducers/ShopSlice";
import { getAllProducts } from "../../redux/reducers/ProductSlice";
import { getAllClubs } from "../../redux/reducers/ClubSlice";
import { getUser } from "../../redux/reducers/CurrentUserSlice";
import { getAllUsers } from "../../redux/reducers/UserSlice";

const Navbar = () => {
  let token = localStorage.getItem("token");
  let userID = localStorage.getItem("userID");
  console.log(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  async function fetchOrders() {
    await axios
      .get("http://34.233.120.213:3000/orders/all/orders", config)
      .then((result) => {
        dispatch(getOrders(result.data));
      });
  }
  async function getRooms() {
    await axios
      .get("http://34.233.120.213:3000/rooms/get/ended/1", config)
      .then((result) => {
        dispatch(getAllRooms(result.data));
      });
  }
  async function getShops() {
    await axios
      .get("http://34.233.120.213:3000/shop", config)
      .then((result) => {
        dispatch(getAllShops(result.data));
      });
  }
  async function getProducts() {
    await axios
      .get("http://34.233.120.213:3000/products", config)
      .then((result) => {
        dispatch(getAllProducts(result.data));
      });
  }
  async function getClubs() {
    await axios
      .get("http://34.233.120.213:3000/club/", config)
      .then((result) => {
        dispatch(getAllClubs(result.data));
      });
  }

  async function getClubs() {
    await axios
      .get("http://34.233.120.213:3000/club/", config)
      .then((result) => {
        dispatch(getAllClubs(result.data));
      });
  }
  async function getUserData() {
    await axios
      .get(`http://34.233.120.213:3000/users/${userID}`, config)
      .then((result) => {
        dispatch(getUser(result.data));
      });
  }
  async function getUsers() {
    axios.get("http://34.233.120.213:3000/users", config).then((result) => {
      console.log("====================================");
      console.log(result.data);
      console.log("====================================");
      dispatch(getAllUsers(result.data));
    });
  }

  useEffect(() => {
    fetchOrders();
    getRooms();
    getProducts();
    getShops();
    getClubs();
    getUserData();
    getUsers();
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> 
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
