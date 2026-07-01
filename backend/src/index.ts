import "dotenv/config";
import express from "express";
import cors from "cors";
import healthRouter from "./routes/health";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors()); // フロントからのアクセス制限を解除
app.use(express.json());
app.use(healthRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
