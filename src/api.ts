import express from "express";
import { PORT, DBURL, CORS_ORIGINS } from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { router as favoriteRouter } from "./routes/favorite.router";
import { router as profileRouter } from "./routes/profile.router";
import { router as simulatorRouter } from "./routes/simulator.router";
import process from "process";

mongoose
  .connect(`${DBURL}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to DB ${DBURL}`);
  });

const app = express();
app.use(cors({ origin: CORS_ORIGINS }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favoriteRouter);
app.use(profileRouter);
app.use(simulatorRouter);

const server = app.listen(PORT, () => {
  console.log(`✅  Ready on port http://localhost:${PORT}`);
  console.log(`\x1b[34m\x1b[1mprocess PID ${process.pid} started\x1b[0m`);
});

function signalHandler(signal) {
  if (signal) {
    console.log(`received signal: ${signal}`);
    console.log(`closing HTTP server`);
    server.close(() => {
      console.log(`HTTP server closed gracefully`);
      mongoose.connection.close(false, () => {
        console.log(`Database connection closed gracefully`);
        console.log(`process PID ${process.pid} stopped`);
        process.exit(0);
      });
    });
  }
};

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
