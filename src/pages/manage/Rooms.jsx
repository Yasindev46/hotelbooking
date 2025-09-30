import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallRooms, reset } from "../../features/Room/roomSlice";
import Roomlist from "./Roomlist";

const Rooms = () => {
  const dispatch = useDispatch();
  const { rooms, isLoading } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getallRooms());
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1 className="text-center">Loding....</h1>
      </div>
    );
  }

  return (
    <div className="rooms-container">
      <h1 className="text-center">Rooms</h1>
    <div className="rooms-content">
      {rooms.length > 0 ?
        rooms.map((item) => {
          return <Roomlist item={item} />;
        }): 
        <h3 className="text-center">No Rooms Found</h3>}
    </div>
    </div>
  );
};

export default Rooms;
