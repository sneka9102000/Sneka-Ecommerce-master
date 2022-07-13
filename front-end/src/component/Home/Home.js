import React, { Fragment,useEffect} from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js"
import MetaData from "../layout/MetaData";
import { clearErrors,getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/loader";
import {useSelector,useDispatch} from "react-redux";
import { useAlert } from "react-alert";
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const alert = useAlert();
  const dispatch =useDispatch();
  const { loading, error, products} = useSelector((state) => state.products);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="WATCH WIZARD" />
          <div className="banner">
            <p>WELCOME TO WATCH WIZARD</p>
            <h1>FIND AMAZING BRANDS BELOW</h1>

            <a href="#brands">
              <button>
                Scroll 
              </button>
            </a>
          </div>

          <h2 className="homeHeading">OUR EXCLUSIVE BRANDS</h2>

          <div className="brands" id="brands">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
