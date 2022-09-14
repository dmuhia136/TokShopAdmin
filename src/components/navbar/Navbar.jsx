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
import { useEffect, useState } from "react";
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
  const currentUser = useSelector((state) => state.currentUser.value);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [user, usersList] = useState([]);

  async function getUserData() {
    await axios
      .get(`http://34.233.120.213:3000/users/${userID}`, config)
      .then((result) => {
        usersList(result.data);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
         <div className="search">
          {/* <input type="text" placeholder="Search..." /> */}
          {/* <SearchOutlinedIcon /> */}
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
            <span>{user.userName}</span>
            <img
              src={
                user.profilePhoto == ""
                  ? "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                  : user.profilePhoto
              }
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
