const express = require("express");

const { newOrder, getSingleOrder, userOrders ,getAllOrders,updateOrder,deleteOrder } = require("../controllers/orderController");
const OrderController = require('../controllers/orderController')

const orderController = new OrderController()


const router =express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
router.route("/order/new").post(isAuthenticatedUser,orderController.newOrder);
router.route("/order/:id").get(isAuthenticatedUser,orderController.getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser,orderController.userOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"),orderController.getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"),orderController.updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"),orderController.deleteOrder);



module.exports = router;