import bcrypt from "bcrypt";
import connection from "../db/connection.js";
import { getAllContacts } from "../models/contactModels.js";

// Render Admin Login Page
export const renderadmin = (req, res) => {
  // Agar already logged in hai → direct dashboard bhej do
  if (req.session && req.session.admin) {
    return res.redirect("/admin/dashboard");
  }
  res.render("adminLogin.ejs");
};

// Handle Admin Login
export const createAdminSession = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  connection.query(
    "SELECT * FROM admin WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).send("Database error");

      if (results.length === 0) {
        return res.status(401).send("Admin not found");
      }

      const storedHash = results[0].password;

      bcrypt.compare(password, storedHash, (err, isMatch) => {
        if (err) return res.status(500).send("Error verifying password");

        if (!isMatch) return res.status(401).send("Invalid password");

        // ✅ Save session
        req.session.admin = { 
          id: results[0].id, 
          username: results[0].username 
        };

        return res.redirect("/admin/dashboard");
      });
    }
  );
};

// ✅ Render dashboard only if logged in
export const renderDashboard = async (req, res) => {
  try {
    const messages = await getAllContacts();
    res.render("adminDashboard.ejs", { 
      admin: req.session.admin, // ✅ pass admin session too
      messages 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading dashboard");
  }
};

// ✅ Handle logout
export const logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/admin"); // back to login page
  });
};
