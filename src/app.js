import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// serve static (ONLY ONCE, point to ../public)
app.use(express.static(path.join(__dirname, "../public")));

// body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session (MemoryStore ok for dev; use Redis/MySQL store in prod)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_change_me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // needs HTTPS + trust proxy
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// if behind reverse proxy (nginx) in prod:
// app.set("trust proxy", 1);

// routes
import authRoute from "./routes/authRoute.js";
import mainRoute from "./routes/mainRoute.js";

app.use("/", authRoute);
app.use("/", mainRoute);

export default app;
