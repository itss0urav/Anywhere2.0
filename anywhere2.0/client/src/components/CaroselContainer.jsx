import React from "react";
import img from "../assets/Anywhere-Transparent.png";
export default function CaroselContainer() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-900 to-blue-500 rounded p-1">
      <img src={img} />
    </div>
  );
}
