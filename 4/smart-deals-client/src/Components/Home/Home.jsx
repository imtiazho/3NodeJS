import React from "react";
import HeroSection from "../../HeroSection/HeroSection";
import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductsPromise = fetch(
  "http://localhost:5000/latest-products",
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
    </div>
  );
};

export default Home;
