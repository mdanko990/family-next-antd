import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import RecordRouter from "./routes/recordRouter.js";
import LastNameRouter from "./routes/lastname.js";
import FirstNameRouter from "./routes/firstname.js";
import FirstNameGroupRouter from "./routes/firstname-group.js";
import PersonRouter from "./routes/personRouter.js";
import EventRouter from "./routes/eventRouter.js";
import StatusRouter from "./routes/statusRouter.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/records", RecordRouter);
app.use("/persons", PersonRouter);
app.use("/dictionary/lastnames", LastNameRouter);
app.use("/dictionary/firstnames", FirstNameRouter);
app.use("/dictionary/groups", FirstNameGroupRouter);

/** one-time use*/
app.use("/events", EventRouter);
app.use("/statuses", StatusRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
