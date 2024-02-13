import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

const corsOptions = {
  origin: process.env.PORT || "http://localhost:8080",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(routes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
