import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { getOrders } from "../../redux/reducers/OrderSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  let token = localStorage.getItem("token");
  console.log(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    async function fetchOrders() {
      await axios
        .get("http://34.233.120.213:3000/orders/all/orders", config)
        .then((result) => {
          dispatch(getOrders(result.data));
        });
    }
    fetchOrders();
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
