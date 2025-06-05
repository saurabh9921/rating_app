import React, { useEffect, useState } from "react";
import { Star, MapPin, Edit2, Save, X, Store } from "lucide-react";
import "./MultiStoreRatingPage.css";
import SideBar from "./SideBar";
import StoreOwnerSideBar from "../sidebars/StoreOwnerSideBar";
import NormalUserSideBar from "../sidebars/NoramalUserSideBar";
import axios from "axios";

export default function MultiStoreRatingPage() {
  const [stores, setStores] = useState([]);

  // useEffect(() => {
  //   const fetchStores = async () => {
  //     try {
  //       const token = localStorage.getItem("access_token"); // or from cookies, context, etc.

  //       const response = await fetch("http://localhost:3000/stores", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Unauthorized or server error");
  //       }

  //       const data = await response.json();
  //       setStores(data);
  //     } catch (error) {
  //       console.error("Error fetching stores:", error);
  //     }
  //   };

  //   fetchStores();
  // }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      // Fetch stores
      const storesRes = await fetch("http://localhost:3000/stores", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!storesRes.ok) {
        throw new Error("Failed to fetch stores");
      }

      const storesData = await storesRes.json();
      setStores(storesData);

      const userId = localStorage.getItem("id");
      // Fetch user ratings (replace 7 with dynamic user ID if needed)
      const ratingsRes = await fetch(
        `http://localhost:3000/ratings/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!ratingsRes.ok) {
        throw new Error("Failed to fetch user ratings");
      }

      const ratingsData = await ratingsRes.json();

      // Map ratings to { storeId: { rating, hasSubmitted: true } }
      const ratingsMap = {};
      ratingsData.forEach((entry) => {
        if (entry.store?.id) {
          ratingsMap[entry.store.id] = {
            rating: entry.rating,
            hasSubmitted: true,
          };
        }
      });

      setUserRatings(ratingsMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  // Sample stores data
  // const [stores] = useState([
  //   {
  //     id: 1,
  //     name: "Tech Paradise Electronics",
  //     address: "123 Main Street, Downtown District, Nagpur, Maharashtra 440001",
  //     overallRating: 4.2,
  //     totalReviews: 127
  //   },
  //   {
  //     id: 2,
  //     name: "Fashion Hub Boutique",
  //     address: "456 Shopping Plaza, Central Avenue, Nagpur, Maharashtra 440012",
  //     overallRating: 3.8,
  //     totalReviews: 89
  //   },
  //   {
  //     id: 3,
  //     name: "Fresh Mart Grocery",
  //     address: "789 Garden Road, Sadar, Nagpur, Maharashtra 440001",
  //     overallRating: 4.5,
  //     totalReviews: 203
  //   },
  //   {
  //     id: 4,
  //     name: "BookWorm Library & Cafe",
  //     address: "321 College Street, Civil Lines, Nagpur, Maharashtra 440001",
  //     overallRating: 4.7,
  //     totalReviews: 156
  //   }
  // ]);

  // State to manage user ratings for each store
  const [userRatings, setUserRatings] = useState({});
  const [editingStore, setEditingStore] = useState(null);
  const [tempRatings, setTempRatings] = useState({});
  const [hoveredStars, setHoveredStars] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStarClick = (storeId, rating) => {
    if (editingStore === storeId) {
      setTempRatings((prev) => ({ ...prev, [storeId]: rating }));
    } else if (!userRatings[storeId]?.hasSubmitted) {
      setUserRatings((prev) => ({
        ...prev,
        [storeId]: { rating, hasSubmitted: false },
      }));
    }
  };

  const handleSubmitRating = async (storeId) => {
  const currentRating = userRatings[storeId]?.rating;

  try {
    const token = localStorage.getItem("access_token");

    const ratingData = {
      rating: parseInt(currentRating),
      userId: parseInt(localStorage.getItem("id")),
      storeId: parseInt(storeId),
    };

    const response = await axios.post(
      "http://localhost:3000/ratings",
      ratingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      // Refresh store and user ratings data
      await fetchData();
    }
  } catch (error) {
    console.error("Error submitting rating:", error);
  }

  if (currentRating > 0) {
    setUserRatings((prev) => ({
      ...prev,
      [storeId]: { rating: currentRating, hasSubmitted: true },
    }));
  }
};


  const handleEditRating = (storeId) => {
    setEditingStore(storeId);
    setTempRatings((prev) => ({
      ...prev,
      [storeId]: userRatings[storeId]?.rating || 0,
    }));
  };

  const handleSaveEdit = async (storeId) => {
    const newRating = tempRatings[storeId];

    try {
    const token = localStorage.getItem("access_token");

    const ratingData = {
      rating: parseInt(newRating),
      userId: parseInt(localStorage.getItem("id")),
      storeId: parseInt(storeId),
    };

    const response = await axios.patch(
      "http://localhost:3000/ratings",
      ratingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      // Refresh store and user ratings data
      await fetchData();
    }
  } catch (error) {
    console.error("Error submitting rating:", error);
  }
    if (newRating > 0) {
      setUserRatings((prev) => ({
        ...prev,
        [storeId]: { rating: newRating, hasSubmitted: true },
      }));
      setEditingStore(null);
      setTempRatings((prev) => ({ ...prev, [storeId]: 0 }));
    }
  };

  const handleCancelEdit = async (storeId) => {
  setEditingStore(null);
  setTempRatings((prev) => {
    const newRatings = { ...prev };
    delete newRatings[storeId]; // Remove temp rating for this store
    return newRatings;
  });
};


  const handleStarHover = (storeId, starNumber) => {
    setHoveredStars((prev) => ({ ...prev, [storeId]: starNumber }));
  };

  const handleStarLeave = (storeId) => {
    setHoveredStars((prev) => ({ ...prev, [storeId]: 0 }));
  };

  const renderStars = (
    rating,
    storeId,
    size = "medium",
    interactive = false
  ) => {
    const hoverRating = hoveredStars[storeId] || 0;

    return [...Array(5)].map((_, index) => {
      const starNumber = index + 1;
      const isFilled =
        hoverRating > 0 ? starNumber <= hoverRating : starNumber <= rating;

      return (
        <Star
          key={index}
          className={`star ${size} ${isFilled ? "filled" : "unfilled"} ${
            interactive ? "interactive" : ""
          }`}
          onClick={
            interactive ? () => handleStarClick(storeId, starNumber) : undefined
          }
          onMouseEnter={
            interactive ? () => handleStarHover(storeId, starNumber) : undefined
          }
          onMouseLeave={
            interactive ? () => handleStarLeave(storeId) : undefined
          }
        />
      );
    });
  };

  const getRatingToDisplay = (storeId) => {
    if (editingStore === storeId) {
      return tempRatings[storeId] || 0;
    }
    return userRatings[storeId]?.rating || 0;
  };

  return (
    <div className="container">
      <NormalUserSideBar />
      <div className="main-wrapper">
        {/* Header */}
        <div className="header">
          <div className="header-title-container">
            <Store className="header-icon" />
            <h1 className="header-title">Store Ratings</h1>
          </div>
          <p className="header-subtitle">
            Rate and review your favorite stores
          </p>

          {/* Search Bar */}
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search store by name or address..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stores Grid */}
        <div className="stores-grid">
          {(searchTerm ? filteredStores : stores).map((store) => {
            const userStoreRating = userRatings[store.id];
            const isEditing = editingStore === store.id;
            const currentRating = getRatingToDisplay(store.id);

            return (
              <div key={store.id} className="store-card">
                {/* Store Header */}
                <div className="store-header">
                  <h2 className="store-name">{store.name}</h2>
                  <div className="store-address-container">
                    <MapPin className="map-pin-icon" />
                    <span className="store-address">{store.address}</span>
                  </div>

                  {/* Overall Rating */}
                  <div className="overall-rating">
                    <p className="overall-rating-label">Overall Rating</p>
                    <div className="overall-rating-display">
                      {renderStars(store.averageRating, store.id, "medium")}
                      <span className="overall-rating-number">
                        {store.averageRating}
                      </span>
                    </div>
                    <p className="overall-rating-count">
                      {store.totalReviews} reviews
                    </p>
                  </div>
                </div>

                {/* User Rating Section */}
                <div className="user-rating-section">
                  <h3 className="user-rating-title">Your Rating</h3>

                  {!userStoreRating?.hasSubmitted ? (
                    /* Initial Rating Submission */
                    <div>
                      <div className="stars-container">
                        {renderStars(
                          currentRating,
                          store.id,
                          "extra-large",
                          true
                        )}
                      </div>

                      {currentRating > 0 && (
                        <div className="rating-display">
                          <p className="selected-rating">
                            Selected:{" "}
                            <span className="rating-value">
                              {currentRating} star
                              {currentRating !== 1 ? "s" : ""}
                            </span>
                          </p>
                          <button
                            onClick={() => handleSubmitRating(store.id)}
                            className="btn btn-primary"
                          >
                            Submit Rating
                          </button>
                        </div>
                      )}

                      {currentRating === 0 && (
                        <p className="instruction-text">
                          Click stars to rate this store
                        </p>
                      )}
                    </div>
                  ) : (
                    /* Display Submitted Rating */
                    <div>
                      {!isEditing ? (
                        <div className="rating-display">
                          <div className="stars-container">
                            {renderStars(
                              userStoreRating.rating,
                              store.id,
                              "large"
                            )}
                          </div>
                          <p className="selected-rating">
                            Your rating:{" "}
                            <span className="rating-value submitted">
                              {userStoreRating.rating} star
                              {userStoreRating.rating !== 1 ? "s" : ""}
                            </span>
                          </p>
                          <button
                            onClick={() => handleEditRating(store.id)}
                            className="btn btn-warning btn-center"
                          >
                            <Edit2 className="btn-icon" />
                            Modify
                          </button>
                        </div>
                      ) : (
                        /* Edit Mode */
                        <div>
                          <div className="stars-container">
                            {renderStars(
                              currentRating,
                              store.id,
                              "extra-large",
                              true
                            )}
                          </div>

                          {currentRating > 0 && (
                            <p className="selected-rating">
                              New rating:{" "}
                              <span className="rating-value">
                                {currentRating} star
                                {currentRating !== 1 ? "s" : ""}
                              </span>
                            </p>
                          )}

                          <div className="button-actions">
                            <button
                              onClick={() => handleSaveEdit(store.id)}
                              disabled={currentRating === 0}
                              className="btn btn-success"
                            >
                              <Save className="btn-icon" />
                              Save
                            </button>
                            <button
                              onClick={() => handleCancelEdit(store.id)}
                              className="btn btn-secondary"
                            >
                              <X className="btn-icon" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
