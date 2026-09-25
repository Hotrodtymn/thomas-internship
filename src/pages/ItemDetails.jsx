import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        setLoading(true);

        console.log("Looking for NFT:", id);

        /*
         * 1. Check New Items
         */
        const newItemsResponse = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        const newItems = await newItemsResponse.json();

        console.log("New Items:", newItems);

        let selectedItem = newItems.find(
          (item) => String(item.nftId) === String(id)
        );

        /*
         * 2. If not found, check Hot Collections
         */
        if (!selectedItem) {
          const collectionsResponse = await fetch(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
          );

          const collections = await collectionsResponse.json();

          console.log("Hot Collections:", collections);

          selectedItem = collections.find(
            (item) => String(item.nftId) === String(id)
          );
        }

        /*
         * 3. If not found, check the author collection
         *
         * This is mainly for NFTs displayed on an Author page.
         */
        if (!selectedItem) {
          const authorResponse = await fetch(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012"
          );

          const authorData = await authorResponse.json();

          console.log("Author:", authorData);

          const authorItem = authorData.nftCollection?.find(
            (item) => String(item.nftId) === String(id)
          );

          if (authorItem) {
            selectedItem = authorItem;
            setAuthor(authorData);
          }
        }

        /*
         * NFT was not found anywhere
         */
        if (!selectedItem) {
          console.log("NFT not found:", id);
          setItem(null);
          setLoading(false);
          return;
        }

        console.log("Selected NFT:", selectedItem);

        setItem(selectedItem);

        /*
         * Get the NFT's author when the API provides authorId.
         */
        if (selectedItem.authorId) {
          const authorResponse = await fetch(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${selectedItem.authorId}`
          );

          if (authorResponse.ok) {
            const authorData = await authorResponse.json();

            console.log("NFT Author:", authorData);

            setAuthor(authorData);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Item Details Error:", error);
        setLoading(false);
      }
    };

    getItemDetails();
  }, [id]);

  /*
   * Loading
   */
  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section
            aria-label="section"
            className="mt90 sm-mt-0"
          >
            <div className="container text-center">
              <h2>Loading...</h2>
            </div>
          </section>
        </div>
      </div>
    );
  }

  /*
   * NFT not found
   */
  if (!item) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section
            aria-label="section"
            className="mt90 sm-mt-0"
          >
            <div className="container text-center">
              <h2>NFT not found</h2>

              <p>
                NFT ID being requested:
              </p>

              <strong>{id}</strong>
            </div>
          </section>
        </div>
      </div>
    );
  }

  /*
   * Author information
   */
  const authorId = author?.authorId || item.authorId;

  const authorName =
    author?.authorName || "Unknown Author";

  const authorImage =
    author?.authorImage || AuthorImage;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          aria-label="section"
          className="mt90 sm-mt-0"
        >
          <div className="container">
            <div className="row">

              {/* NFT IMAGE */}
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title || "NFT"}
                />
              </div>

              {/* NFT INFORMATION */}
              <div className="col-md-6">
                <div className="item_info">

                  {/* NFT TITLE */}
                  <h2>{item.title}</h2>

                  {/* NFT COUNTS */}
                  <div className="item_info_counts">

                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      0
                    </div>

                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes || 0}
                    </div>

                  </div>

                  {/* DESCRIPTION */}
                  <p>
                    {item.title} is part of the{" "}
                    {authorName} NFT collection.
                  </p>

                  {/* OWNER */}
                  <div className="d-flex flex-row">
                    <div className="mr40">

                      <h6>Owner</h6>

                      <div className="item_author">

                        <div className="author_list_pp">
                          <Link
                            to={
                              authorId
                                ? `/author/${authorId}`
                                : "/author"
                            }
                          >
                            <img
                              className="lazy"
                              src={authorImage}
                              alt={authorName}
                            />

                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link
                            to={
                              authorId
                                ? `/author/${authorId}`
                                : "/author"
                            }
                          >
                            {authorName}
                          </Link>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* CREATOR */}
                  <div className="de_tab tab_simple">

                    <div className="de_tab_content">

                      <h6>Creator</h6>

                      <div className="item_author">

                        <div className="author_list_pp">
                          <Link
                            to={
                              authorId
                                ? `/author/${authorId}`
                                : "/author"
                            }
                          >
                            <img
                              className="lazy"
                              src={authorImage}
                              alt={authorName}
                            />

                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link
                            to={
                              authorId
                                ? `/author/${authorId}`
                                : "/author"
                            }
                          >
                            {authorName}
                          </Link>
                        </div>

                      </div>

                    </div>

                    <div className="spacer-40"></div>

                    {/* PRICE */}
                    <h6>Price</h6>

                    <div className="nft-item-price">
                      <img
                        src={EthImage}
                        alt="Ethereum"
                      />

                      <span>
                        {item.price} ETH
                      </span>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;