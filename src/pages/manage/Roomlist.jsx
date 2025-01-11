import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallRooms, reset } from "../../features/Room/roomSlice";
import { Link } from "react-router-dom";
import Room from "./Room";

const Roomlist = ({ item }) => {

  return (
    <div className="roomlist-container">
      <Link to={`/rooms/getall/${item._id}`}>
        <div className="room-box">
          <img src="/room.webp" alt="" />
          <h2 className="text-center">{item.name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default Roomlist;
