import React from "react";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
  AiFillHeart,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";

const Footer = () => {
  return (
    <section className="bg-dark-hard">
      <footer className="container mx-auto grid grid-cols-10 px-5 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
        <div className=" flex flex-col items-center space-y-4 col-span-12 lg:col-span-10">
          <div className="bg-primary text-white p-3 rounded-full">
            <AiFillHeart className="w-7 h-auto" />
          </div>
          <p className="font-bold italic text-dark-light">
            Copyright © 2023. Crafted with love.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
