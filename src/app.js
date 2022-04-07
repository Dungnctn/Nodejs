import express from "express";
import morgan from "morgan";
import cors from "cors";
import productRouter from "./routes/product";
import CategoryRouter from "./routes/category";
import userRouter from './routes/auth'
import mongoose from "mongoose";
import swaggerUI from 'swagger-ui-express'
import YAML from "yamljs";

const app = express();
const SwaggerJSDocs = YAML.load('./api.yaml');

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(SwaggerJSDocs));

// routes
app.use("/api", productRouter);
app.use("/api", CategoryRouter);
app.use("/api", userRouter);

// connect mongodb
try {
    mongoose.connect("mongodb://localhost:27017/project");
    console.log("Connect mongodb thanh cong");
} catch (error) {
    console.log("Connect mongodb khong thanh cong");
}

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server dang chay cong "+PORT);
})
