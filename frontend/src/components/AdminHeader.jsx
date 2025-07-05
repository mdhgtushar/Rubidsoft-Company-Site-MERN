import React from "react";
import { Link } from "react-router-dom";
import MenuButton from "../components/MenuButton1";

const AdminHeader = () => {
  return (
    <div>
      <Link to="/admin">
        <div className="flex items-center">
          <div className="p-5 pl-0">
            <img
              className="w-20"
              src="https://scontent.fdac157-1.fna.fbcdn.net/v/t39.30808-6/470226643_1247796683055656_8928878490233155816_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=-p_GxVmfj7oQ7kNvwHSJxra&_nc_oc=Adkaz0UyNeZhmMumGZQWeNKh2EuZ89ClHtG2B37o5rEDR3l-MGRFznFv7TsKSH0Uku4&_nc_zt=23&_nc_ht=scontent.fdac157-1.fna&_nc_gid=sgkqcWN1UsjOyJriadVIpg&oh=00_AfSJH1fytl6bRXVp3vnwZPjaqZmchrUcWvLvemy6boH5Ig&oe=686EAF7F"
              alt=""
            />
          </div>
          <div>
            <b>Rubidsoft Compreh. It Services</b>
            <h4>From Concept to Code, We Deliver Excellence</h4>
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
            goLink={"/admin/tasks"}
            title="Tasks"
          />
           <MenuButton
            active={false}
            btn={2}
            goLink={"/admin/clients"}
            title="Clients"
          />
          <MenuButton
            active={false}
            btn={2}
            goLink={"/admin/services"}
            title="Services"
          />
          <MenuButton
            active={false}
            btn={2}
            goLink={"/admin/products"}
            title="Products"
          />
          <MenuButton
            active={false}
            btn={2}
            goLink={"/admin/lab"}
            title="Lab"
          />
          <MenuButton
            active={false}
            btn={2}
            goLink={"/admin/contact"}
            title="Contact"
          />
          <MenuButton
            active={false}
            btn={2}
            goLink={"/admin/blog"}
            title="News & Updates"
          />
          <MenuButton
            active={false}
            btn={2}
            goLink={"/admin/settings"}
            title="Settings"
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
