const express = require ("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");
const ProductController = require('../controllers/productController')

const productController = new ProductController()

const router = express.Router ();

router.route("/products").get(productController.getAllProducts)
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"),productController.getAdminProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"),productController.createProduct)
router.route("/admin/product/:id").put(productController.updateProduct)
router.route("/admin/product/:id").delete(productController.deleteProduct)

router.route("/product/:id").get(productController.getProductDetails);

router.route("/review").put(isAuthenticatedUser,productController.createProductReview);

router.route("/reviews").put(productController.getProductReviews).delete(isAuthenticatedUser,productController.deleteReview);
// router
//   .route("/admin/products")
//   .get(isAuthenticatedUser, authorizeRoles("admin"),productController.getAdminProducts);




module.exports = router