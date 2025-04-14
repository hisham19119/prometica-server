const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const documentRoutes = require("./routes/document.routes");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const dbConecction = require("./config/dbConnection");
const cors = require("cors");

dbConecction();

app.use((req, res, next) => {
  const allowedOrigins = ["https://prometica.vercel.app"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// app.use(
//   cors({
//     origin: "https://prometica.vercel.app",
//     // origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     // allowedHeaders: ["Content-Type"],
//     credentials: true,
//   })
// );

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/documents/", documentRoutes);
app.use("/api/auth/", authRouter);
app.use("/api/users/", userRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Prometica API is running successfully!",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || "Production",
  });
});

// app.listen("4000", () => {
//   console.log("listening to port 4000 now .....");
// });
