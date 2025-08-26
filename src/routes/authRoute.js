import express from "express";
import { renderadmin, createAdminSession, renderDashboard, logoutAdmin } from "../controllers/authController.js";

// import { renderadmin, createAdminSession,} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Show Admin Login Page
router.get("/admin", renderadmin);

// Handle Login Submission
router.post("/admin/dashboard", createAdminSession);

// Protected Dashboard Route
router.get("/admin/dashboard", isAuthenticated, renderDashboard);

//Handdle logout
router.get("/admin/logout", logoutAdmin);


export default router;
