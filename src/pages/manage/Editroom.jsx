import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateRoom, reset } from "../../features/Room/roomSlice";

const Editroom = () => {
  const { isSuccesss } = useSelector((state) => state.room);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFromData] = useState({
    name: "Delux",
    price: 3000,
    desc: "Delux bed",
    roomNumbers: "201,202,301",
  });

  const { name, price, desc, roomNumbers } = formData;

  const handleChange = (e) => {
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomArray = roomNumbers.split(",").map((item) => {
      return { number: parseInt(item), availableDates: [] };
    });
    const datatoSubmit = {
      name,
      price,
      desc,
      roomNumbers: roomArray,
      roomId: id,
    };
    dispatch(updateRoom(datatoSubmit));
  };

  useEffect(() => {
    if (isSuccesss) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccesss, dispatch, navigate]);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`http://localhost:4040/api/rooms/${id}`);
        if (res.ok) {
          const data = await res.json();

          const { roomNumbers, ...rest } = data;
          const roomMap = roomNumbers.map((item) => item.number);
          const roomString = roomMap.join(",");
          console.log("===>", roomString);
          setFromData({ ...rest, roomNumbers: roomString });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, []);

  return (
    <div>
      <h1 className="text-header-center">Edit room</h1>
      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your room name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              placeholder="Enter room price"
              name="price"
              value={price}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="desc">Description</label>
            <textarea name="desc" value={desc} onChange={handleChange}>
              {" "}
            </textarea>
          </div>
          <div className="input-group">
            <label htmlFor="roomnumbers">Room numbers</label>
            <textarea
              name="roomnumbers"
              placeholder="enter room numbers seperate by comma Ex:- 202, 203"
              value={roomNumbers}
              onChange={handleChange}
            >
              {" "}
            </textarea>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Editroom;
