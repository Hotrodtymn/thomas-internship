import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import AuthorImage from "../../images/author_thumbnail.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Hot Collections");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Hot Collections:", data);
        setCollections(data);
      })
      .catch((error) => {
        console.error("Error fetching Hot Collections:", error);
      });
  }, []);

  const carouselOptions = {
    items: 4,
    margin: 20,
    loop: true,
    rewind: true,
    nav: true,
    dots: false,
    autoplay: false,
    slideBy: 4,
    smartSpeed: 800,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      992: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            {collections.length > 0 && (
              <OwlCarousel className="owl-theme" {...carouselOptions}>
                {collections.map((collection) => (
                  <div className="item" key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={collection.title}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage || AuthorImage}
                            alt={collection.title}
                          />
                        </Link>

                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>

                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
