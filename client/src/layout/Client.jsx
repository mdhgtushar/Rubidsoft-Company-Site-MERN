import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../inc/Header';

const Client = () => {
  return (
    <div>
      <Header />
      <section class="container flex justify-between mx-auto">
        <div class="w-64">
          <div class="pt-5 border my-5">
            <div class="bg-gray-100 p-2 px-5 font-bold">
              <h3>News & Update</h3>
            </div>

            <div className="">
              <div class="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Fashion Hub (buying house) for their
                  official website development
                </p>
              </div>{' '}
              <div class="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Mascon Fashion (USA) for their e-commerce
                  website development
                </p>
              </div>{' '}
              <div class="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Technique BD for their official website's
                  renovation
                </p>
              </div>{' '}
              <div class="p-1 px-5">
                <p>** This is our new client</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 px-5 my-5">
          <Outlet />
        </div>
        <div class="w-64">
          <div class="pt-5 border my-5">
            <div class="bg-gray-100 p-2 px-5 font-bold">
              <h3>News & Update</h3>
            </div>

            <div className="">
              <div class="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Fashion Hub (buying house) for their
                  official website development
                </p>
              </div>{' '}
              <div class="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Mascon Fashion (USA) for their e-commerce
                  website development
                </p>
              </div>{' '}
              <div class="p-1 px-5 border-b">
                <p>
                  * 01Soft have received work order from Technique BD for their official website's
                  renovation
                </p>
              </div>{' '}
              <div class="p-1 px-5">
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
