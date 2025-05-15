
require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
//connect to databse before starting server
connectDB();
//Middleware-----------
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Routes----------
//customer routes
const customerRoutes = require("./routes/customerRoutes");
app.use("/api/customer",customerRoutes);
//user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/user",userRoutes);
// dummy API testing
app.get("/",(req,res)=>{
    res.send("API is working Accurately");
});
//error handling---------------
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error:"Something Unexpected happened"});
});
//server entry point
// Handle both local + Render
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3700;
  app.listen(PORT, () => {
    console.log(`✅ Server running locally at http://localhost:${PORT}`);
  });
}

// Export for Render
module.exports = app;
