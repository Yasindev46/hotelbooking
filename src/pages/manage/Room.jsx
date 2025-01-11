import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteRoom, reset } from "../../features/Room/roomSlice";
import Carousel from "../../components/Carousel/Carousel";

const Room = () => {
  const { id } = useParams();
  const { isSuccesss } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [room, setRoom] = useState(null);

  const handleDelete = () => {
    dispatch(deleteRoom(id));
  };

  useEffect(() => {
    if (isSuccesss) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccesss]);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`http://localhost:4040/api/rooms/${id}`);
        if (res.ok) {
          const data = await res.json();

          setRoom(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, []);
  return (
    <div className="room-container">
      <h1 className="text-center">Room</h1>
      <div className="room-item">
        {room ? (
          <>
            {" "}
            <Carousel/>
            <h2 className="text-center">{room.name}</h2>
            <p>{room.desc}</p>
            <h3> Rs. {room.price.toFixed(2)}</h3>
            <Link to={`/bookings/${room._id}`}> <button>Book Now</button></Link>
            {user && user.isAdmin && (
              <Link to={`/rooms/edit/${room._id}`}>
                <button>Edit Room</button>
              </Link>
            )}
            {user && user.isAdmin && (
              <button onClick={handleDelete}>Delete</button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Room;
