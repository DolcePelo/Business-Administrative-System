import { Router } from "express";
import { loginSession, registerSession, registerError, forgotLogic } from "../controllers/sessions.js";
import passport from "passport";

const router = Router();

router.post("/login", loginSession);

router.post("/signup", passport.authenticate("register"),
registerSession, registerError);

// router.get("/forgot", forgotRender);
router.post("/forgot", forgotLogic);

export default router;