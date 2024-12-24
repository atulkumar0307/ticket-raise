import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import { signup, login } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, (req, res) => {
    return res.status(200).json({ message: "Welcome to your profile", user: req.user });
});

export default router;
