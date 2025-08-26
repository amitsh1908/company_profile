import { saveContact, getAllContacts, deleteContact } from "../models/contactModels.js";
import { homedir } from "os";
import connection from "../db/connection.js";

// Public Pages
export const renderHome = (req, res) => {
    res.render("home.ejs");
};

export const renderService = (req, res) => {
    res.render("service.ejs");
};

export const renderClient = (req, res) => {
    res.render("client.ejs");
};

export const renderAbout = (req, res) => {
    res.render("aboutUs.ejs");
};

export const renderContact = (req, res) => {
    res.render("contact.ejs");
};

// Handle Contact Form Submission
export const submitContactForm = async (req, res) => {
    try {
        await saveContact(req.body);
        res.redirect("/contact"); // after form submit go to admin dashboard
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving contact");
    }
};

// Admin Dashboard - Show Messages
export const getAdminDashboard = async (req, res) => {
    try {
        const messages = await getAllContacts();
        res.render("adminDashboard.ejs", { messages });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading dashboard");
    }
};

// Delete a Message
export const deleteMessage = async (req, res) => {
    try {
        await deleteContact(req.params.id);
        res.redirect("/admin/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting message");
    }
};
