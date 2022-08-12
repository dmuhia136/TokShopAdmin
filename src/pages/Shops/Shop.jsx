import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ShopTable from "./ShopTable";

const Shops = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ShopTable />
      </div>
    </div>
  );
};

export default Shops;
