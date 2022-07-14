const express = require("express");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth")
const UserController = require('../controllers/userController')
const Authentication = require('../middleware/auth.js')
const userController = new UserController()
const authentication = new Authentication()
const router = express.Router();

router
    .route("/register")
    .post(userController.registerUser);

router
    .route("/login")
    .post(userController.loginUser);

router
    .route("/logout")
    .get(userController.logout);

router
    .route("/me")
    .get(authentication.isAuthenticatedUser,userController.getUserDetails);

router
    .route("/password/update")
    .put(authentication.isAuthenticatedUser,userController.updatePassword);

router
    .route("/me/update")
    .put(authentication.isAuthenticatedUser,userController.updateProfile);

router
    .route("/admin/users")
    .get(authentication.isAuthenticatedUser,authentication.authorizeRoles("admin"),userController.getAllUser);

router
    .route("/admin/user/:id")
    .get(authentication.isAuthenticatedUser,authentication.authorizeRoles("admin"),userController.getSingleUser)
    .put(authentication.isAuthenticatedUser,authentication.authorizeRoles("admin"),userController.updateUserRole)
    .delete(authentication.isAuthenticatedUser,authentication.authorizeRoles("admin"),userController.deleteUser);

module.exports = router;


