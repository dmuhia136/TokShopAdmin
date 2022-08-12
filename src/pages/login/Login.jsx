import { useEffect, useState } from "react";
import "./login.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginProcess } from "../../redux/reducers/LoginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  var error = "";
  async function loginUser() {
    console.log(email, password);

    var loginInfo = { email, password };
    axios
      .post("http://34.233.120.213:3000/login", loginInfo)
      .then((result) => {
        console.log("====================================");
        console.log(result);
        console.log("====================================");
        if (result.code == "ERR_BAD_REQUEST") {
          error = "You have entered the wrong password";
        } else {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("userID", result.data._id);
          dispatch(loginProcess(result.data));
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <div className="align">
        <div className="grid align__item">
          <div className="register">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="site__logo"
              width="56"
              height="84"
              viewBox="77.7 214.9 274.7 412"
            >
              <defs>
                <linearGradient id="a" x1="0%" y1="0%" y2="0%">
                  <stop offset="0%" stop-color="#8ceabb" />
                  <stop offset="100%" stop-color="#378f7b" />
                </linearGradient>
              </defs>
              <path
                fill="url(#a)"
                d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z"
              />
            </svg>

            <h2>Admin</h2>

            <div className="form">
              <div className="form__field">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form__field_text"
                  placeholder="info@mailaddress.com"
                />
              </div>

              <div class="form__field">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form__fiNameeld_text"
                  placeholder="••••••••••••"
                />
              </div>

              <div className="form__field">
                <input type="submit" value="Login" onClick={loginUser} />
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
