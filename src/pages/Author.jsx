import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const authorId = id || "73855012";

    setLoading(true);

    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch author");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Author API:", data);

        setAuthor(data);
        setFollowers(data.followers || 0);

        // Reset follow state when visiting another author
        setFollowing(false);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Author API Error:", error);
        setLoading(false);
      });
  }, [id]);

  const handleFollow = () => {
    if (following) {
      setFollowing(false);
      setFollowers((currentFollowers) =>
        Math.max(0, currentFollowers - 1)
      );
    } else {
      setFollowing(true);
      setFollowers((currentFollowers) => currentFollowers + 1);
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            background: `url(${AuthorBanner}) top`,
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">

                  <div className="de-flex-col">
                    <div className="profile_avatar">

                      <img
                        src={author?.authorImage || AuthorImage}
                        alt={author?.authorName || "Author"}
                      />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {loading
                            ? "Loading..."
                            : author?.authorName || "Author"}

                          <span className="profile_username">
                            {author?.tag ? `@${author.tag}` : ""}
                          </span>

                          <span
                            id="wallet"
                            className="profile_wallet"
                          >
                            {author?.address || ""}
                          </span>

                          <button
                            id="btn_copy"
                            title="Copy Text"
                          >
                            Copy
                          </button>
                        </h4>
                      </div>

                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">

                      <div className="profile_follower">
                        {followers} followers
                      </div>

                      <button
                        type="button"
                        className="btn-main"
                        onClick={handleFollow}
                      >
                        {following ? "Unfollow" : "Follow"}
                      </button>

                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">

                  <AuthorItems
                    items={
                      Array.isArray(author?.nftCollection)
                        ? author.nftCollection
                        : []
                    }
                    loading={loading}
                  />

                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;