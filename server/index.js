require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth-route.js");
const contectRouter = require("./router/contect-router.js");
const connectDb = require("./utils/db.js");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET , POST , DELETE , PUT , PATCH ",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/form", contectRouter);

const PORT = 8000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server listening on : ${PORT}`);
  });
});
