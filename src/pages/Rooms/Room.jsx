import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import RoomsTable from "./RoomTable";

const Rooms = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <RoomsTable />
      </div>
    </div>
  );
};

export default Rooms;
