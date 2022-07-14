const express = require("express");
const { newOrder, getSingleOrder, userOrders ,getAllOrders,updateOrder,deleteOrder } = require("../controllers/orderController");
const OrderController = require('../controllers/orderController')
const Authentication = require ('../middleware/auth.js')
const orderController = new OrderController()
const authentication = new Authentication()
const router =express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
.route("/order/new")
.post(authentication.isAuthenticatedUser,orderController.newOrder);

router
.route("/order/:id")
.get(authentication.isAuthenticatedUser,orderController.getSingleOrder);

router
.route("/orders/me")
.get(authentication.isAuthenticatedUser,orderController.userOrders);

router
.route("/admin/orders")
.get(orderController.getAllOrders);

router
  .route("/admin/order/:id")
  .put(authentication.isAuthenticatedUser,authentication.authorizeRoles("admin"),orderController.updateOrder)
  .delete(authentication.isAuthenticatedUser,authentication.authorizeRoles("admin"),orderController.deleteOrder);



module.exports = router;