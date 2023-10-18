import React from "react";
import Cinema from "./Cinema";
import Banner from "./Banner";
import Showing from "./Showing";
import Footer from "./Footer"

export default function Home() {
  return (
    <div>
      <Banner />
      <Showing />
      <Cinema />
      <Footer />
    </div>
  );
}
