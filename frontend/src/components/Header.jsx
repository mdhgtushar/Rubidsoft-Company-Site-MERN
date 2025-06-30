import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <div className="fixed bg-gray-100 p-5 w-screen bottom-0">
        <div className="container mx-auto flex justify-between">
          <div className="">
            <p>Rubidsoft - All Rights Reserved</p>
          </div>
          <div className="nav1right">
            <Link className="fl-r" to="/admin">
              Admin
            </Link>
          </div>
        </div>
      </div>
      <div className=" bg-gray-100 p-2">
        <div className="container mx-auto flex justify-between">
          <div className="">
            <p>Email: info@rubidsoft.com || Mob: +8801712498815</p>
          </div>
          <div className="nav1right">
            <Link className="fl-r" to=" ">
              Developer
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b border-t-8">
        <section className="container flex justify-between items-center mx-auto py-2">
          <div className="left">
            <div className="logo">
              <img src="http://www.01soft.com.bd/assets/img/Logo2.gif" alt="" />
            </div>
            <div className="hotline"></div>
          </div>
          <div className="flex">
            <div className="flex flex-col justify-center items-center p-2 mr-2 bg-gray-100">
              <img className="w-16" src="http://www.01soft.com.bd/assets/img/top5.png" alt="" />
              <Link to="" className="text-sm">
                <b>Website Development</b>
              </Link>
            </div>
            <div className="flex flex-col justify-center items-center p-2 bg-gray-100">
              <img
                className="w-16"
                src="http://www.01soft.com.bd/assets/img/slider2%20(2).png"
                alt=""
              />
              <Link to="" className="text-sm">
                <b>WebSite Template</b>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-gray-100 border-b ">
        <section className="container mx-auto">
          <div className="menus">
            <b>
              <ul className="flex justify-between items-center">
                <li>
                  <Link to="/" className="p-2 block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/website_development">Website Development</Link>
                </li>
                <li>
                  <Link to="/website_templates">Website Templates</Link>
                </li>
                <li>
                  <Link to="/works">Our Works</Link>
                </li>
                <li>
                  <Link to="/contact">Contact us</Link>
                </li>
              </ul>
            </b>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Header;
