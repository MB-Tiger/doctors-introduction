import React, { useState, useEffect } from "react";
import useTitle from "../hooks/useTitle";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { AiFillStar } from "react-icons/ai";
import ReactPaginate from "react-paginate";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Doctors() {
  useTitle("Doctors");
  const [users, setUsers] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    fetch("https://www.tebinja.com/api/v1/doctors/searchi?page=0")
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.doctors.hits);
        const arr = json.doctors.hits.map((item) => item._source);
        // console.log(arr);
        setUsers(arr);
      });
  }, []);
  const fetchComponent = (currentPage) => {
    fetch(
      `https://www.tebinja.com/api/v1/doctors/searchi?page=${Number(
        currentPage
      )}`
    )
      .then((response) => response.json())
      .then((json) => {
        const arr = json.doctors.hits.map((item) => item._source);
        setUsers(arr);
      });
  };
  const openModal = (id) => {
    const p = users.findIndex((user) => user.id === id);
    setModalValue(users[p]);
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
  const pageClick = (data) => {
    let currentPage = data.selected;
    fetch(fetchComponent(currentPage));
    console.log(currentPage);
  };
  console.log(users);
  return (
    <div className="w-full bg-slate-50">
      {isModal === true ? (
        <div
          className=" w-full h-screen fixed bg-black opacity-50"
          onClick={() => closeModal()}
        ></div>
      ) : null}
      <div className="container">
        {isModal === true ? (
          <div className="text-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-slate-100 rounded-md mt-4 z-1000">
            <div>
              <MapContainer
                className=" left-1/2 -translate-x-1/2 w-full"
                center={[
                  modalValue.clinics[0].latitude,
                  modalValue.clinics[0].longtitude,
                ]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    modalValue.clinics[0].latitude,
                    modalValue.clinics[0].longtitude,
                  ]}
                >
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className=" absolute bottom-0 left-1/2 -translate-x-1/2 pb-6 text-blue-900">
              <Link to={`/userinfo/${modalValue.id}`}>Read more</Link>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap justify-center items-center pt-10 pb-2">
        <span className="pr-4"> Find faster your doctor in current page </span>
        <input
          type="search"
          className="w-1/3 border-2 p-1"
          placeholder="Search ..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center space-x-2 py-4 ">
        <div className=" w-12 h-1 rounded-full bg-yellow-600"></div>
        <div>our doctors</div>
        <div className=" w-12 h-1 rounded-full bg-yellow-600"></div>
      </div>
      <section className="flex justify-evenly flex-wrap max-w-7xl mx-auto min-h-screen mb-5">
        {users.length ? (
          users
            .filter((user) => {
              return (
                user.fname.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.lname.toLowerCase().includes(searchValue.toLowerCase())
              );
            })
            .map((user, index) => {
              console.log(user);
              return (
                <div
                  key={index}
                  className="w-72 min-h-[500px] m-5 bg-slate-100 shadow rounded cursor-pointer transition-all duration-300 hover:scale-110"
                  onClick={() => openModal(user.id)}
                >
                  <div className="flex justify-center mt-5">
                    <img
                      className="w-full max-w-[250px] min-h-[250px] border-2 rounded-full shadow border-sky-300"
                      src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${user.url}`}
                      alt="doctor-photo"
                    />
                  </div>
                  <div className="mt-7 p-1 pr-6 pb-2 card-body">
                    <p>
                      {user.fname} {user.lname}
                    </p>
                    {user.spUnis.length === 0 ? null : (
                      <p> متخصص {user.spUnis[0].specialty.name} </p>
                    )}
                    <p>
                      {" "}
                      <AiFillStar className="inline align-middle" /> {user.rate}{" "}
                    </p>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800"></div>
        )}
      </section>
      <div>
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={999}
          onPageChange={pageClick}
          containerClassName="flex justify-center items-center pb-8 pt-1"
          pageClassName="py-1 px-4 hover:bg-blue-200 transition duration-[300ms]"
          nextClassName="py-1 px-4"
          previousClassName="py-1 px-4"
          breakClassName="py-1 px-4"
        />
      </div>
    </div>
  );
}
