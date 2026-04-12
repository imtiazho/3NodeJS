import React from "react";
import Hero from "../../Components/Shared/NavBar/Individual/Hero/Hero";
import RecentProducts from "../../Components/Shared/NavBar/Individual/RecentProducts/RecentProducts";
import Footer from "../../Components/Shared/Footer/Footer";

const latestProductPromise = fetch(
  "https://raw.githubusercontent.com/imtiazho/JsonData/refs/heads/main/products.json",
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
