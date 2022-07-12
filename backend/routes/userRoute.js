const express = require("express");
// const { registerUser, loginUser,logout, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth")
const UserController = require('../controllers/userController')

const userController = new UserController()

const router = express.Router();

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/logout").get(userController.logout);
router.route("/me").get(isAuthenticatedUser,userController.getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,userController.updatePassword);
router.route("/me/update").put(isAuthenticatedUser,userController.updateProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),userController.getAllUser);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),userController.getSingleUser).put(isAuthenticatedUser,authorizeRoles("admin"),userController.updateUserRole).delete(isAuthenticatedUser,authorizeRoles("admin"),userController.deleteUser);






module.exports = router;


