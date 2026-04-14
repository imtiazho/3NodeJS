import React from "react";
import Hero from "../../Components/Shared/NavBar/Individual/Hero/Hero";
import RecentProducts from "../../Components/Shared/NavBar/Individual/RecentProducts/RecentProducts";
import Footer from "../../Components/Shared/Footer/Footer";

const latestProductPromise = fetch(
  "http://localhost:5000/latest-products",
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <RecentProducts latestProductPromise={latestProductPromise}></RecentProducts>
    </div>
  );
};

export default Home;
