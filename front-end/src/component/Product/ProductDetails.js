import React, { Fragment, useEffect,useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails,clearErrors,newReview } from "../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";

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
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }

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
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      dispatch(getProductDetails(id));
    }, [dispatch,id,error,alert]);
    
    if(product)
    {
      return (
        <Fragment>
            <div className="ProductDetails"> 
              <div>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="SingleProduct"
                      key={i}
                      src={item.url}
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

              {/* <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button> */}
            </div>
          </div>
         
        </Fragment>
    );
  }; 
};
export default ProductDetails;

