import axios from "axios";

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProduct =   (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
    try{
        dispatch({ type: ALL_PRODUCT_REQUEST });
        console.log("keyword : ",keyword)
        let link=`http://localhost:5050/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category) {
          link = `http://localhost:5050/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;

        }
        const { data } = await axios.get(link);
        console.log("data : ",data)
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
          });
    }

};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    console.log("called")
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const token=localStorage.getItem('usersAccessToken')

    const config = { headers: { "Content-Type": "multipart/form-data","Authorization":token } };


    const { data } = await axios.get("http://localhost:5050/api/v1/admin/products",config);
    console.log(data)

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  console.log("form-data",productData)
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    // const config = {
    //   headers: { "Content-Type": "application/json" },
    // };
    const token=localStorage.getItem('usersAccessToken')

    const config = { headers: { "Content-Type": "application/json","Authorization":token } };
    const { data } = await axios.post(
      `http://localhost:5050/api/v1/admin/product/new`,
      productData,
      config
    );
      //console.log("RESPONSE",data)
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
    //console.log("ERROR",error)
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    console.log("called")
    console.log("request data",id,productData)
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    // const token=localStorage.getItem('usersAccessToken')

    // const config = { headers: { "Content-Type": "multipart/form-data"} };

    const { data } = await axios.put(
      `http://localhost:5050/api/v1/admin/product/${id}`,
      productData,
      config
    );
    console.log("data response",data)

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log("error",error)
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    console.log(id)
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`http://localhost:5050/api/v1/admin/product/${id}`);
    console.log(data)
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log("ERROR WEB",error)
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Get Products Details
export const  getProductDetails = (id) => async (dispatch) => {
    try {
      console.log("dispatch")
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      console.log("action came")
      const { data } = await axios.get(`http://localhost:5050/api/v1/product/${id}`);
      //console.log(data)
      console.log("data",data)
  
      await dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // NEW REVIEWproductController
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`http://localhost:5050/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
  