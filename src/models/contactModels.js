import mysql from "mysql2/promise";

// Database connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Amit@123",
  database: "furiousdb"
});

// Save contact form data
export const saveContact = async ({ name, email, mobile, message }) => {
  const query = `
    INSERT INTO contacts (name, email, mobile, message, date)
    VALUES (?, ?, ?, ?, NOW())
  `;
  await pool.query(query, [name, email, mobile, message]);
};

// Get all contacts
export const getAllContacts = async () => {
  const [rows] = await pool.query("SELECT * FROM contacts ORDER BY date DESC");
  return rows;
};

// Delete contact by ID
export const deleteContact = async (id) => {
  await pool.query("DELETE FROM contacts WHERE id = ?", [id]);
};
