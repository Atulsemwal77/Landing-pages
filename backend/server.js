const dotenv = require("dotenv");
const express = require("express");
const DbConnection = require("./db");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const adminRoutes = require("./Routes/Admin");
const blog_route = require("./Routes/blogRoute");
const path = require("path");
const studentRoutes = require("./Routes/studentRoutes");
const freelancerStudentRouter = require("./freelancer/studentRouter");
const freelancerBlogRoute = require('./freelancer/blogRoute')
const itStudentRoute = require('./itLandingPage/studentRouter')
const itBlogRoute = require('./itLandingPage/blogRoute')

dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://landing-pages-govtlandingpage.onrender.com/",
      "https://landing-pages-freelancerlandingpage.onrender.com/",
      "https://landing-pages-itlandingpage.onrender.com/"

    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blog_route); //for govt landing page 
app.use("/api/students", studentRoutes); //for govt landing page

app.use("/api/freelancerStudent", freelancerStudentRouter);
app.use("/api/freelancerBlog" , freelancerBlogRoute )

app.use('/api/itstudent' , itStudentRoute)
app.use('/api/itBlog' , itBlogRoute)

app.use("/", (req, res) => {
  res.json("Welcome to backend");
});

DbConnection();
PORT = process.env.PORT || 3131;
app.listen(PORT, () => {
  console.log(`server is rinning on port ${PORT}`);
});
