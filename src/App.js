import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import OrderPage from "./pages/Order/Order";
import Product from "./pages/Products/Product";
import Rooms from "./pages/Rooms/Room";
import Shops from "./pages/Shops/Shop";
import OrderInfo from './pages/Order/OrderInfo'
import ProductInfo from "./pages/Products/ProductInfo"
import RoomInfo from './pages/Rooms/RoomInfo'
import ShopInfo from "./pages/Shops/ShopInfo";
import EditUser from "./pages/single/EditUser";
import Profile from "./pages/single/Profile";
import { useNavigate } from "react-router-dom";

function App() {
  const { darkMode } = useContext(DarkModeContext);


  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edituser"  >
              <Route path=":id" element={<EditUser />} />

            </Route>
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":id" element={<Single />} />
              {/* <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              /> */}
            </Route>
            <Route path="orders">
              <Route index element={<OrderPage />} />
              <Route path=":id" element={<OrderInfo />} />
              <Route
                path="new"
                element={<OrderInfo inputs={productInputs} title="Add New order" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<Product />} />
              <Route path=":id" element={<ProductInfo />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="rooms">
              <Route index element={<Rooms />} />
              <Route path=":id" element={<RoomInfo />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="shops">
              <Route index element={<Shops />} />
              <Route path=":id" element={<ShopInfo />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
