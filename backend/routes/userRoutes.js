import express from "express";
import { loginUser, myProfile, registerUser, userProfile } from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', isAuth, myProfile);
router.get("/:id", isAuth, userProfile);

export default router;