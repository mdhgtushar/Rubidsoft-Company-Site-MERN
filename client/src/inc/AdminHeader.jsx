import React from "react";
import { Link } from "react-router-dom";
import MenuButton from "../components/MenuButton1";

const AdminHeader = () => {
  return (
    <div>
      <Link to="/admin">
        <div className="flex items-center">
          <div class="p-5 pl-0">
            <img
              className="h-20 w-20"
              src="http://localhost/ZM-International-School-PHP/zmadminschool/img/logo.jpg"
              alt=""
            />
          </div>
          <div class="logotitle">
            <b>Z.M.INTERNATIONAL SCHOOL</b>
            <h4>zminternationalschool.com</h4>
          </div>
        </div>
      </Link>

      <nav>
        <p className="w-full border-b-2 pt-2 border-gray-400 mt-4 text-md font-normal">
          Dashboard
        </p>
        <MenuButton active={true} btn={1} goLink={"/admin"} title="DASHBORD" />
        <div>
          <p className="w-full border-b-2 pt-2 border-gray-400 mt-4 text-md font-normal">
            Modules
          </p>

          <MenuButton
            active={false}
            btn={2}
            goLink={"/admin/news"}
            title="Work Portfolio"
          />
          <MenuButton
            active={false}
            btn={2}
            goLink={"/admin/news"}
            title="News & Updates"
          />
          <p className="w-full border-b-2 pt-2 border-gray-400 mt-4 text-md font-normal">
            Action
          </p>
          <div>
            <MenuButton active={false} btn={2} goLink={"#"} title="Logout" />
            <MenuButton
              active={false}
              btn={2}
              goLink={"/"}
              title="Main Site "
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminHeader;
