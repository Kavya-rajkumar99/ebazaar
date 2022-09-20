import React from "react";

export const Rating = ({ rating, numOfReviews }) => {
  return (
    <div className="d-flex flex-row justify-content-between">
      <div className="rating">
        <span>
          <i
            className={
              rating >= 1
                ? "fa-solid fa-star"
                : rating >= 0.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 2
                ? "fa-solid fa-star"
                : rating >= 1.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 3
                ? "fa-solid fa-star"
                : rating >= 2.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 4
                ? "fa-solid fa-star"
                : rating >= 3.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 5
                ? "fa-solid fa-star"
                : rating >= 4.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        </span>
      </div>
      <div>
        <p className="mb-0">{numOfReviews} Reviews</p>
      </div>
    </div>
  );
};
