const express = require("express");
const router = express.Router();

const {addUser,getUsers,getUser,updateUser,deleteUser} = require('../controller/user')
const {addProduct,getProducts,getProduct,updateProduct,deleteProduct} = require('../controller/product')
const { register, login,checkAuth} = require('../controller/auth');
const { auth } = require('../middleware/auth');

router.get("/users",auth, getUsers);
router.put("/user/:id",auth, updateUser);
router.delete("/user/:id",auth, deleteUser);

router.post("/product",auth, addProduct);
router.get("/products",auth, getProducts);
router.put("/product/:id",auth, updateProduct);
router.delete("/product/:id",auth, deleteProduct);

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth/:id", auth, checkAuth);


module.exports = router;