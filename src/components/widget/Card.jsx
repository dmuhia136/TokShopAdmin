import React from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";

const Card = ({count,title }) => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">{count.length}</span>
        <span className="link">{}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {} %
        </div>
        {}
      </div>
    </div>
  );
};

export default Card;
