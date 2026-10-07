import { Link } from "react-router-dom";

const Roomlist = ({ item }) => {

  return (
    <div className="roomlist-container">
      <Link to={`/rooms/getall/${item._id}`}>
        <div className="room-box">
          <img src={`${process.env.PUBLIC_URL}/room.webp`} alt="" />
          <h2 className="text-center">{item.name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default Roomlist;
