import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import AdminHeader from '../../components/AdminHeader';

const Admin = () => {
  return (
    <div>
      {" "}
      <div>
        <div className="flex">
          <div className="p-5 w-96 h-screen bg-gray-100 overflow-scroll">
            <AdminHeader />
          </div>
          <div className="flex-1 h-screen overflow-scroll">
            <div className="overflow-hidden p-5 bg-gray-100">
              <h2 className="float-left">
                <Link to="/admin">
                  <b>Rubidsoft Supper admin V1.0</b>
                </Link>
              </h2>

              <ul className="float-right inline-block">
                <li>
                  <Link to="/admin/">Settings</Link>
                </li>
              </ul>

              <ul className="float-right inline-block">
                <li>
                  <Link to="/auth/login">Login</Link> ||{" "}
                  <Link to="/auth/register">Register</Link>
                </li>
              </ul>
            </div>
            <hr />
            <div className="p-5">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
