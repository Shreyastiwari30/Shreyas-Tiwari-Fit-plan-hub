const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const planRoutes=require("./routes/plan.routes");
const subscriptionRoutes = require("./routes/subscription.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

app.get("/", (req, res) => {
  res.send("FitPlanHub API running");
});

module.exports = app;
