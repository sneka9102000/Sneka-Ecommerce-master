const express = require ("express");
const ProductController = require('../controllers/productController')
const Authentication = require('../middleware/auth.js')
const productController = new ProductController()
const authentication = new Authentication()
const router = express.Router ();

router
.route("/products").get(productController.getAllProducts)

router
  .route("/admin/products")
  .get(authentication.isAuthenticatedUser,authentication.authorizeRoles("admin"),productController.getAdminProducts);

router
  .route("/admin/product/new")
  .post(authentication.isAuthenticatedUser,authentication.authorizeRoles("admin"),productController.createProduct)

router
  .route("/admin/product/:id")
  .put(productController.updateProduct)

router
  .route("/admin/product/:id")
  .delete(productController.deleteProduct)

router
  .route("/product/:id")
  .get(productController.getProductDetails);

router
  .route("/review")
  .put(authentication.isAuthenticatedUser,productController.createProductReview);

router
  .route("/reviews")
  .put(productController.getProductReviews)
  .delete(authentication.isAuthenticatedUser,productController.deleteReview);

module.exports = router