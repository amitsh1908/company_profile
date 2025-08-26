import mysql from "mysql2";

// Create a single database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Amit@123",
  database: "furiousdb"
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
    return;
  }
  console.log("✅ Database connected!");
});

// Export the connection
export default connection;
