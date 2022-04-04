import React, { useState, useEffect } from "react";
import useTitle from "../hooks/useTitle";
import { AiFillStar } from "react-icons/ai";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export default function Home() {
  useTitle("Home");
  const [users, setUsers] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
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
  const openModal = (id) => {
    const p = users.findIndex((user) => user.id === id);
    setModalValue(users[p]);
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
  return (
    <div>
      <header>
        {isModal === true ? (
          <div
            className="w-full h-screen fixed bg-black opacity-50 z-50"
            onClick={() => closeModal()}
          ></div>
        ) : null}
        <div>
          <h1 className="absolute 2xl:text-5xl md:text-4xl xl:mt-72 xl:ml-36 text-3xl lg:mt-36 lg:ml-24 md:mt-28 md:ml-10 mt-10 ml-6 text-gray-900 font-bold leading-relaxed">
            Take care of your {<br />} health now
          </h1>
          <img
            className="w-full h-auto"
            src={require("../img/happiness-bargain-clinic-bed-equipment.jpg")}
            alt="header-photo"
          />
        </div>
      </header>
      <main className="w-full bg-slate-50">
        <div className=" container">
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
        <div className="flex items-center justify-center space-x-2 py-5 ">
          <div className=" w-12 h-1 rounded-full bg-yellow-600"></div>
          <div>our popular doctors</div>
          <div className=" w-12 h-1 rounded-full bg-yellow-600"></div>
        </div>
        {
          <section className="flex justify-evenly flex-wrap max-w-7xl mx-auto min-h-[600px] mb-5">
            {users.length ? (
              [...users]
                .sort((a, b) => a.rate - b.rate)
                .reverse()
                .slice(0, 3)
                .map((user, index) => {
                  console.log(user);
                  return (
                    <div
                      key={index}
                      className="w-72 m-5 bg-slate-100 shadow rounded cursor-pointer transition-all duration-300 hover:scale-110"
                      onClick={() => openModal(user.id)}
                    >
                      <div className="flex justify-center mt-8">
                        <img
                          className="w-full max-w-[250px] min-h-[250px] border-2 rounded-full shadow border-sky-300"
                          src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${user.url}`}
                          alt="doctor-photo"
                        />
                      </div>
                      <div className="mt-8 p-1 pr-6 pb-2 card-body">
                        <p>
                          {user.fname} {user.lname}
                        </p>
                        <p> متخصص {user.spUnis[0].specialty.name} </p>
                        <p>
                          {" "}
                          <AiFillStar className="inline align-middle" />{" "}
                          {user.rate}{" "}
                        </p>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800"></div>
            )}
          </section>
        }
      </main>
    </div>
  );
}
