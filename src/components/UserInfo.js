import React, { useState, useEffect } from "react";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AiOutlineCloseCircle, AiFillStar } from "react-icons/ai";

export default function UserInfo() {
  useTitle("doctor Info");
  const [user, setUser] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://www.tebinja.com/api/v1/doctors/${id}`)
      .then((response) => response.json())
      .then((json) => {
        const arr = json.doctor;
        setUser([arr]);
      });
  }, []);
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-userInfo hidden lg:block">
        <div className=" w-full h-[300px] bg-black bg-opacity-[0.15]"></div>
      </div>
      {user.length ? (
        <div className="max-w-7xl mx-auto bg-slate-200 shadow-lg relative lg:-top-16 p-6 rounded card-body">
          <Link to="/doctors">
            {" "}
            <AiOutlineCloseCircle />{" "}
          </Link>
          <div className="flex flex-wrap">
            <img
              className="mr-5"
              src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${user[0].url}`}
              alt="doctor-photo"
            />
            <div className="mr-5">
              <p>
                {" "}
                <AiFillStar className="inline" /> {user[0].rate}{" "}
              </p>
              <p>
                {" "}
                {user[0].fname} {user[0].lname}{" "}
              </p>
              <p>
                {" "}
                متخصص{" "}
                {user[0].spUnis.length === 0
                  ? null
                  : user[0].spUnis[0].specialty.name}{" "}
              </p>
              <p>
                {" "}
                دانشگاه {user[0].university
                  ? user[0].university.name
                  : null}{" "}
              </p>
              <p>
                {" "}
                شماره تماس:{" "}
                {user[0].clinics.length === 0 ||
                user[0].clinics[0].telePhones.length === 0
                  ? null
                  : user[0].clinics[0].telePhones[0].phone}{" "}
              </p>
              <p>
                {" "}
                ساعات کار:{" "}
                {user[0].clinics.length === 0 ||
                user[0].clinics[0].clinicsTimeSheets.length === 0
                  ? null
                  : user[0].clinics[0].clinicsTimeSheets[0].label}{" "}
                {user[0].clinics.length === 0 ||
                user[0].clinics[0].clinicsTimeSheets.length === 0
                  ? null
                  : user[0].clinics[0].clinicsTimeSheets[0].startTime}{" "}
                الی{" "}
                {user[0].clinics.length === 0 ||
                user[0].clinics[0].clinicsTimeSheets.length === 0
                  ? null
                  : user[0].clinics[0].clinicsTimeSheets[0].endTime}{" "}
              </p>
              <p>
                {" "}
                آدرس:{" "}
                {user[0].clinics.length === 0
                  ? null
                  : user[0].clinics[0].address}{" "}
              </p>
              <p> توضیحات: {user[0].about} </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800 mx-auto"></div>
      )}
      {console.log(user)}
    </div>
  );
}
