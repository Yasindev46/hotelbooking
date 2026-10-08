import { Link } from "react-router-dom";

const Roomlist = ({ item }) => {

  return (
    <div className="roomlist-container" style={{ backgroundImage: "yellow" , border: "1px solid #0c0c0c", borderRadius: "5px", marginBottom: "15px" }}>
      <Link to={`/rooms/getall/${item._id}`}>
        <div className="room-box" >
          <img src={`${process.env.PUBLIC_URL}/room.webp`} alt=""/>
          <h2 className="text-center">{item.name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default Roomlist;
