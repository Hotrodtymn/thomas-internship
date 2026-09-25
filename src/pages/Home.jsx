import React from "react";

import HotCollections from "../components/home/HotCollections";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Hero */}
        <section
          aria-label="section"
          className="no-top no-bottom"
          data-aos="fade-up"
        >
          <div className="container">
            {/* Keep your existing Home hero content here */}
          </div>
        </section>

        {/* Hot Collections */}
        <section aria-label="section">
          <div
            className="container"
            data-aos="fade-up"
          >
            <HotCollections />
          </div>
        </section>

        {/* New Items */}
        <section aria-label="section">
          <div
            className="container"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <NewItems />
          </div>
        </section>

        {/* Top Sellers */}
        <section aria-label="section">
          <div
            className="container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <TopSellers />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;