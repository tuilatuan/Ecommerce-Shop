const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const hpp = require("hpp");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const colorProductRoutes = require("./routes/colorProductRoutes");
const statusOrderRoutes = require("./routes/statusOrderRoutes");
const shippingTypeRoutes = require("./routes/shippingTypeRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderDetailRoutes = require("./routes/orderDetailRoutes");

dotenv.config({ path: "/.env" });

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/color-product", colorProductRoutes);
app.use("/api/v1/statusOrder", statusOrderRoutes);
app.use("/api/v1/shippingType", shippingTypeRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/orderDetail", orderDetailRoutes);
app.use(xss());
app.use(hpp());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
