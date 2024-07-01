import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../util/ApiFunctions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditRoom() {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePre, setImage] = useState("");
  const [successMsg, setmsg] = useState("");
  const [errorMsg, setError] = useState("");
  const { roomId } = useParams();

  const handleImageChange = (e) => {
    //console.log(e.target.files[0])
    const selectedImg = e.target.files[0];
    const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result.split(',')[1]); // Set Base64 part of the result
        };
        reader.readAsDataURL(selectedImg);
    setRoom({ ...room, photo: selectedImg });
    //setImage(URL.createObjectURL(selectedImg));
  };

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImage(roomData.photo);
      } catch (error) {
        console.log(error.message)
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200 || response.status === 201) {
        setmsg("Room Updated");
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);
        setImage(updatedRoomData.photo);
        setError("");
      } else {
        setError("Error Updating room");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="room justify-content-center">
          <div className="col-md-8 col-lf-6">
            <h2 className="mt-5 mb-2">Edit Room</h2>

            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label hotel-color" htmlFor="roomType">
                  Room Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roomType"
                  name="roomType"
                  value={room.roomType}
                  onChange={handleRoomInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label hotel-color" htmlFor="roomPrice">
                  Room Price
                </label>
                <input
                  onChange={handleRoomInputChange}
                  className="form-control"
                  value={room.roomPrice}
                  required
                  id="roomPrice"
                  name="roomPrice"
                  type="number"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="photo">
                  Room Photo
                </label>
                <input
                  onChange={handleImageChange}
                  className="form-control"
                  required
                  id="photo"
                  name="photo"
                  type="file"
                />
                {imagePre && (
                  <img
                    src={`data:image/jpeg;base64,${imagePre}`}
                    className="mb-3"
                    alt="Room Photo"
                    style={{ maxWidth: "400px", maxHeigth: "400px" }}
                  />
                )}
              </div>

              <div className="d-grid d-md-flex mt-2">
                <Link
                  to={"/existing-rooms"}
                  className="btn btn-outline-info ml-5"
                >
                  Back
                </Link>
                <button type="submit" className="btn btn-outline-warning">
                  Edit Room
                </button>
              </div>
            </form>
            {successMsg && <p className="text-success">{successMsg}</p>}
            {errorMsg && <p className="text-danger">{errorMsg}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
