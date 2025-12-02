import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/auth.controllers.js";

const router = Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;