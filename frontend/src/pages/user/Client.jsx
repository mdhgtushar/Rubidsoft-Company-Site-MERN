import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const Client = () => {
  return (
    <div>
      <Header />
      <section className="container flex justify-between mx-auto">
        <div className="w-64">
          <div className="pt-5 border my-5">
            <div className="bg-gray-100 p-2 px-5 font-bold">
              <h3>News & Update</h3>
            </div>

            <div className="">
              <div className="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Fashion Hub (buying house) for their
                  official website development
                </p>
              </div>{' '}
              <div className="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Mascon Fashion (USA) for their e-commerce
                  website development
                </p>
              </div>{' '}
              <div className="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Technique BD for their official website's
                  renovation
                </p>
              </div>{' '}
              <div className="p-1 px-5">
                <p>** This is our new client</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 px-5 my-5">
          <Outlet />
        </div>
        <div className="w-64">
          <div className="pt-5 border my-5">
            <div className="bg-gray-100 p-2 px-5 font-bold">
              <h3>News & Update</h3>
            </div>

            <div className="">
              <div className="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Fashion Hub (buying house) for their
                  official website development
                </p>
              </div>{' '}
              <div className="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Mascon Fashion (USA) for their e-commerce
                  website development
                </p>
              </div>{' '}
              <div className="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Technique BD for their official website's
                  renovation
                </p>
              </div>{' '}
              <div className="p-1 px-5">
                <p>** This is our new client</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Client;
