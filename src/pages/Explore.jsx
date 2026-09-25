import React, { useEffect, useState } from "react";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getExploreItems = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch explore items");
        }

        const data = await response.json();

        console.log("Explore API:", data);

        setItems(data);
      } catch (error) {
        console.error("Explore API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getExploreItems();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Explore Header */}
        <section
          aria-label="section"
          className="mt90 sm-mt-0"
          data-aos="fade-up"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Explore</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Items */}
        <section aria-label="section">
          <div
            className="container"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <ExploreItems
              items={items}
              loading={loading}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;