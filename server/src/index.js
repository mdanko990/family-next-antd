import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import RecordRouter from "./routes/record.js";
import DocumentRouter from "./routes/document.js";
import LastNameRouter from "./routes/lastname.js";
import FirstNameRouter from "./routes/firstname.js";
import FirstNameGroupRouter from "./routes/firstname-group.js";
import PersonRouter from "./routes/personRouter.js";
import StatusRouter from "./routes/status.js";
import TypeRouter from "./routes/type.js";
import RoleRouter from "./routes/role.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/records", RecordRouter);
app.use("/documents", DocumentRouter);
app.use("/persons", PersonRouter);
app.use("/dictionary/lastnames", LastNameRouter);
app.use("/dictionary/firstnames", FirstNameRouter);
app.use("/dictionary/groups", FirstNameGroupRouter);

/** one-time use*/
app.use("/dictionary/types", TypeRouter);
app.use("/dictionary/statuses", StatusRouter);
app.use("/dictionary/roles", RoleRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
