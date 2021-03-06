import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Header from "./component/layout/Header/Header.js";
import React from "react";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Routes/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList";

function App(){
  const { isAuthenticated, user } = useSelector((state) => state.user)

    return (
      <Router>
      <Header/>

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        
         <Route path="/" element={<Home/>} />
         <Route extact path="/product/:id" element={<ProductDetails/>} /> 
         <Route exact path="/account" element={<Profile/>} />
         <Route exact path="/me/update" element={<UpdateProfile/>} />
         <Route extact path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
         <Route extact path="/login" element={<LoginSignUp/>} />
         <Route extact path="/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>} />
         <Route extact path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />
         <Route extact path="/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>} />
         <Route extact path="/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>} />


         <Route
          exact
          role={"admin"}
          path="/admin/dashboard"
          element={<ProtectedRoute><Dashboard/></ProtectedRoute>}
        />
        <Route
          exact
          role={"admin"}
          path="/admin/product"
          element={<ProtectedRoute><NewProduct/></ProtectedRoute>}
        />
        <Route
          exact
          path="/admin/products"
          role={"admin"}
          element={<ProtectedRoute><ProductList/></ProtectedRoute>}
        />

        <Route
          exact
          path="/admin/product/:id"
          role={"admin"}
          element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>}
        />

        <Route
          exact
          path="/admin/orders"
          role={"admin"}
          element={<ProtectedRoute><OrderList/></ProtectedRoute>}
        />

      </Routes>
    </Router>

  );
}
export default App;
  
