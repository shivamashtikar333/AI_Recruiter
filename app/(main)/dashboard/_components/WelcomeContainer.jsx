"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";

const WelcomeContainer = () => {
  const { user } = useUser();
  return (
    <div className="bg-white p-5 rounded-xl flex items-center justify-between shadow-md">
      <div>
        <h2 className="text-lg font-bold">Welcome Back, {user?.name}</h2>
        <p className="text-gray-500">
          AI-Driven Interviews, Hassle free Hiring
        </p>
      </div>
      {user && (
        <Image
          src={user?.picture}
          alt="user avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </div>
  );
};

export default WelcomeContainer;
