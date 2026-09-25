import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Fetch Explore Items
  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Explore items");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Explore API:", data);
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Explore API Error:", error);
        setLoading(false);
      });
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format countdown
  const formatCountdown = (expiryDate) => {
    if (!expiryDate) {
      return "No expiration";
    }

    const difference = expiryDate - currentTime;

    if (difference <= 0) {
      return "Expired";
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Sort
  const sortedItems = [...items].sort((a, b) => {
    if (sort === "price_low_to_high") {
      return a.price - b.price;
    }

    if (sort === "price_high_to_low") {
      return b.price - a.price;
    }

    if (sort === "likes_high_to_low") {
      return b.likes - a.likes;
    }

    return 0;
  });

  // Display only the number of items currently allowed
  const displayedItems = sortedItems.slice(0, visibleItems);

  // Load 8 more
  const handleLoadMore = () => {
    setVisibleItems((previous) => previous + 8);
  };

  return (
    <>
      {/* Filter */}
      <div>
        <select
          id="filter-items"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setVisibleItems(8);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {/* Loading Skeleton */}
      {loading &&
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{
              display: "block",
              backgroundSize: "cover",
            }}
          >
            <div className="nft__item">
              {/* Image Skeleton */}
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "#e5e5e5",
                  borderRadius: "8px",
                  animation: "exploreSkeletonPulse 1.5s ease-in-out infinite",
                }}
              />

              {/* Info Skeleton */}
              <div
                style={{
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    width: "65%",
                    height: "18px",
                    background: "#e5e5e5",
                    borderRadius: "4px",
                    marginBottom: "12px",
                    animation: "exploreSkeletonPulse 1.5s ease-in-out infinite",
                  }}
                />

                <div
                  style={{
                    width: "35%",
                    height: "14px",
                    background: "#e5e5e5",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    animation: "exploreSkeletonPulse 1.5s ease-in-out infinite",
                  }}
                />

                <div
                  style={{
                    width: "25%",
                    height: "14px",
                    background: "#e5e5e5",
                    borderRadius: "4px",
                    animation: "exploreSkeletonPulse 1.5s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>
        ))}

      {/* Actual Items */}
      {!loading &&
        displayedItems.map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{
              display: "block",
              backgroundSize: "cover",
            }}
          >
            <div className="nft__item">
              {/* Author */}
              <div className="author_list_pp">
                <Link
                  to="/author"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img
                    className="lazy"
                    src={item.authorImage || AuthorImage}
                    alt={item.title || "Author"}
                  />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              {/* Countdown */}
              <div className="de_countdown">
                {formatCountdown(Number(item.expiryDate))}
              </div>

              {/* NFT Image */}
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>

                    <div className="nft__item_share">
                      <h4>Share</h4>

                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>

                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>

                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <Link to="/item-details">
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt={item.title || "NFT"}
                  />
                </Link>
              </div>

              {/* NFT Information */}
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{item.title}</h4>
                </Link>

                <div className="nft__item_price">{item.price} ETH</div>

                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

      {/* No Results */}
      {!loading && sortedItems.length === 0 && (
        <div className="col-md-12 text-center">
          <p>No items found.</p>
        </div>
      )}

      {/* Load More */}
      {!loading && visibleItems < sortedItems.length && (
        <div className="col-md-12 text-center">
          <button
            type="button"
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}

      {/* Skeleton Animation */}
      <style>
        {`
          @keyframes exploreSkeletonPulse {
            0% {
              opacity: 1;
            }

            50% {
              opacity: 0.5;
            }

            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default ExploreItems;
