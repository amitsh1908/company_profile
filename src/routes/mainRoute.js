import express from "express";
const router = express.Router();

import {
  renderClient,
  renderHome,
  renderService,
  renderAbout,
  renderContact,
  submitContactForm,     // new
  getAdminDashboard,     // new
  deleteMessage          // new
} from "../controllers/mainController.js";

// Public pages
router.get("/", renderHome);
router.get("/service", renderService);
router.get("/client", renderClient);
router.get("/about", renderAbout);

// Contact page
router.get("/contact", renderContact);       // Show contact form
router.post("/contact", submitContactForm);  // Save form data to SQL

// Admin dashboard
router.get("/admin/dashboard", getAdminDashboard);

// Delete message
router.post("/admin/delete/:id", deleteMessage);

export default router;
