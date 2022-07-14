const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

class OrderController {

  // Create new Order

  newOrder = catchAsyncErrors(async (req, res, next) => {
  try{
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }

  });


  // get Single Order
  getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  try{
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  });


  // get logged in user  Orders
  userOrders = catchAsyncErrors(async (req, res, next) => {
  try{
    const orders = await Order.find({ user: req.user._id });
      res.status(200).json({
      success: true,
      orders,
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  });


  // get all Orders -- Admin
  getAllOrders = catchAsyncErrors(async (req, res, next) => {

  try{
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  });


  // update Order Status -- Admin
  updateOrder = catchAsyncErrors(async (req, res, next) => {
    try
    {
      const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  });

  updateStock = async (id, quantity) => {
    try{
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  }
  

  // delete Order -- Admin
  deleteOrder = catchAsyncErrors(async (req, res, next) => {
    try{
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
      success: true,
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  });
}

module.exports = OrderController;






