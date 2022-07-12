import React, { Fragment, useEffect,useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails,clearErrors,newReview } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";


const ProductDetails = () => {
    const dispatch = useDispatch();
    const {id}=useParams();
    const alert = useAlert();
    const{products,error} = useSelector(
      (state)=>state.productDetails
      )

    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
        dispatch(getProductDetails(id));
    },[dispatch,id,error,alert]);

    const options = {
      edit: false,
      color:"rgba(20,20,20,20,0.1)",
      activecolor:"tomato",
      size:window.innerWidth < 600 ? 20 : 25,
      value:2.5,
      isHalf:true,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    const increaseQuantity = () => {
      if (products.Stock <= quantity) return;
  
      const qty = quantity + 1;
      setQuantity(qty);
    };
  
    const decreaseQuantity = () => {
      if (1 >= quantity) return;
  
      const qty = quantity - 1;
      setQuantity(qty);
    };

    const addToCartHandler = () => {
      dispatch(addItemsToCart(id, quantity));
      alert.success("Item Added To Cart");
    };
    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };
  
    const reviewSubmitHandler = () => {
      const myForm = new FormData();
  
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId",id);
  
      dispatch(newReview(myForm));
  
      setOpen(false);
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      // // if (reviewError) {
      // //   alert.error(reviewError);
      // //   dispatch(clearErrors());
      // // }import Products from "./Products";

  
      // // if (success) {
      // //   alert.success("Review Submitted Successfully");
      // //   dispatch({ type: NEW_REVIEW_RESET });
      // // }
      // dispatch(getProductDetails(id));
    }, [dispatch,id, error, alert]);
  

    if(products)
    {
      console.log(products.reviews)
      return (
        <Fragment>
            <div className="ProductDetails"> 
              <div>
              <img
                      className="CarouselImage"
                      src={products.images[0].url}
                      alt={`image`}
                    />
              </div>
              <div>
              <div className="detailsBlock-1">
                <h2>{products.name}</h2>
                <p>Product # {products._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span >({products.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${products.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>{quantity}
                    {/* <input readOnly type= "number" value={quantity} /> */}
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button 
                  onClick={addToCartHandler}
                  disabled={products.Stock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={products.Stock < 1 ? "redColor" : "greenColor"}>
                    {products.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{products.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <ReactStars
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {products.reviews && products.reviews[0] ? (
            <div className="reviews">
              {products.reviews &&
                products.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
         
        </Fragment>
    );
  }; 
};
export default ProductDetails;

