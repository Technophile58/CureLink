// // import express from "express"
// // import cors from 'cors'
// // import 'dotenv/config'
// // import connectDB from "./config/mongodb.js"
// // import connectCloudinary from "./config/cloudinary.js"
// // import userRouter from "./routes/userRoute.js"
// // import doctorRouter from "./routes/doctorRoute.js"
// // import adminRouter from "./routes/adminRoute.js"

// // // app config
// // const app = express()
// // const port = process.env.PORT || 4000
// // connectDB()
// // connectCloudinary()

// // // middlewares
// // app.use(express.json())
// // app.use(cors())

// // // api endpoints
// // app.use("/api/user", userRouter)
// // app.use("/api/admin", adminRouter)
// // app.use("/api/doctor", doctorRouter)

// // app.get("/", (req, res) => {
// //   res.send("API Working")
// // });

// // app.listen(port, () => console.log(`Server started on PORT:${port}`))



// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import userRouter from "./routes/userRoute.js";
// import doctorRouter from "./routes/doctorRoute.js";
// import adminRouter from "./routes/adminRoute.js";

// // App config
// const app = express();
// const port = process.env.PORT || 5000;

// // Connect DB and Cloudinary
// connectDB();
// connectCloudinary();

// // ✅ Middlewares
// app.use(express.json());

// // ✅ Allow your frontend (Vite default: 5174)
// app.use(
//   cors({
//     origin: "http://localhost:5174", // match your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // API endpoints
// app.use("/api/user", userRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter);

// // Test route
// app.get("/", (req, res) => {
//   res.send("✅ API Working Fine");
// });

// // Start server
// app.listen(port, () => console.log(`🚀 Server started on PORT: ${port}`));



import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// App config
const app = express();
const port = process.env.PORT || 5000;

// Connect DB and Cloudinary
connectDB();
connectCloudinary();

// ✅ Middlewares
app.use(express.json());

// ✅ Allow both frontends (main & admin)
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ API Working Fine");
});

// ✅ Start server
app.listen(port, () => console.log(`🚀 Server started on PORT: ${port}`));
