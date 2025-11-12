// import mongoose from "mongoose";

// const connectDB = async () => {

//     mongoose.connection.on('connected', () => console.log("Database Connected"))
//     await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)

// }

// export default connectDB;

// // Do not use '@' symbol in your databse user's password else it will show an error.


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}prescripto`); // ✅ fixed: no double slash
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;
