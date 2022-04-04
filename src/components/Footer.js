import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer className="bg-nav-custom-color flex flex-wrap justify-evenly">
        <div className="text-slate-100 p-2">
          <div>
            <div className="mb-2">
              <h5 className="font-bold text-yellow-400 pb-0.5">Contact us</h5>
              <hr />
            </div>
            <div className="space-y-1">
              <p>27 Division St, New York NY 10002, USA</p>
              <p>Call Us 24/7 +8 (123) 456 789 12</p>
              <p>Mon-Fri: 8.00 - 20.00 St-Sun: 9.00 - 16.00</p>
            </div>
          </div>
        </div>
        <div className="text-slate-100 p-2">
          <div>
            <div className="mb-2">
              <h5 className="font-bold text-yellow-400 pb-0.5">Support</h5>
              <hr />
            </div>
            <div className="space-y-1">
              <a href="#" className="block">
                Privecy Policy
              </a>
              <a href="#" className="block">
                Cookie Policy
              </a>
              <a href="#" className="block">
                Purchasing Policy
              </a>
              <a href="#" className="block">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
        <div className="text-slate-100 p-2">
          <div>
            <div className="mb-2">
              <h5 className=" font-bold text-yellow-400 pb-0.5">Useful link</h5>
              <hr />
            </div>
            <ul className="space-y-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/doctors">Doctors</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
