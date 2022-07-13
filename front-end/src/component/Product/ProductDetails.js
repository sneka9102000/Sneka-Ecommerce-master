import React, { Fragment, useEffect,useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails,clearErrors,newReview } from "../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
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

const navigate = useNavigate();
    const {id}=useParams();
    const alert = useAlert();
    const{product,error} = useSelector(
      (state)=>state.productDetails
      )
      const{isAuthenticated} = useSelector(
        (state)=>state.user
        )

    useEffect(()=>{
      dispatch(getProductDetails(id));
      // if(error){
      //   alert.error(error);
      //   dispatch(clearErrors());
      // }

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
      if (product.Stock <= quantity) return;
  
      const qty = quantity + 1;
      setQuantity(qty);
    };
  
    const decreaseQuantity = () => {
      if (1 >= quantity) return;
  
      const qty = quantity - 1;
      setQuantity(qty);
    };

    const addToCartHandler = () => {
      if(isAuthenticated)
      {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
      }
      else
      {
        navigate("/login")
      }
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

      dispatch(getProductDetails(id));
    }, [dispatch,id,error,alert]);
    
    // console.log("product",product.images[0].url)
    console.log("authenticated",isAuthenticated)
    if(product)
    {
      return (
        <Fragment>
            <div className="ProductDetails"> 
              <div>
              {/* <img
                      className="CarouselImage"
                      src={product.images[0].url}
                      alt={`image`}
                    /> */}
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="SingleProduct"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </div>
              <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span >({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>{quantity}
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button 
                  onClick={addToCartHandler}
                  disabled={product.Stock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
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

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
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

