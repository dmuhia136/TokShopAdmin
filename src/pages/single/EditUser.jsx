import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, useParams } from "react-router-dom";
function EditUser() {
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [mpesa, setMpesa] = useState("");
  const [wallet, setWallet] = useState("");
  const [user, userState] = useState([]);

  const data = {
    firstName: firstname,
    lastName: lastname,
    mpesaNumber: mpesa,
    wallet: wallet,
  };
  let token = localStorage.getItem("token");
  const { id } = useParams();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const navigate = useNavigate();
  async function getUserData() {
    await axios
      .get(`http://34.233.120.213:3000/users/${id}`, config)
      .then((result) => {
        console.log(result.data);
        userState(result.data);
      });
  }
  async function editUser() {
    await axios.put(`http://34.233.120.213:3000/users/${id}`, data, config);
    navigate("/users");
  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="pt-20 p-10 space-y-10 grid-col-1">
          <p className="text-xl font-bold ">Edit user</p>
          <div>
            <input
              type="text"
              className="w-48 placeholder-gray-500 border-solid border-gray-500 h-10"
              placeholder={user.firstName == "" ? "First Name" : user.firstName}
              onInput={(e) => setfirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="w-48 placeholder-gray-500 border-solid border-gray-500 h-10"
              placeholder={user.lastName == "" ? "Last Name" : user.lastName}
              onInput={(e) => setlastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              className="w-48 placeholder-gray-500 border-solid border-gray-500 h-10"
              placeholder={
                user.mpesaNumber == "" ? "Mpesa Number" : user.mpesaNumber
              }
              onInput={(e) => setMpesa(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              className="w-48 placeholder-gray-500 border-solid border-gray-500 h-10"
              placeholder={user.wallet == "" ? "Wallet" : user.wallet}
              onInput={(e) => setWallet(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={() => editUser()}
              className="bg-blue-600 hover:text-gray-800 shadow-lg text-white font-bold hover:bg-blue-400 p-3 rounded-lg"
            >
              Edit User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
