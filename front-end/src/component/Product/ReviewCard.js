// import { Rating } from "@material-ui/lab";
import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../assets/images/Profile.png";

const ReviewCard = (props) => {
    console.log("called",props.review)
  const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 600 ? 20:25,
    value: props.review.rating,
    isHalf:true,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{props.review.name}</p>
      <ReactStars {...options} />
      <span>{props.review.comment} </span>
    </div>
  );
};

export default ReviewCard;
