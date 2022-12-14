import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path"
import { fileURLToPath } from 'url';
import parks from "./routes/parks.js";
import activities from "./routes/activities.js";
import favorites from "./routes/favorites.js";
import user from "./routes/user.js";
import newsletterSubscriber from "./routes/newsletterSubscriber.js";
import './db/db-connection.js';

// set port and listen for requests
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(REACT_BUILD_DIR))
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use("/", allRouter);
app.use("/api/parks", parks);
app.use("/api/activities", activities);
app.use("/api/favorites", favorites);
app.use("/api/user", user);
app.use("/api/newsletterSubscriber", newsletterSubscriber);

// creates an endpoint for the route 
app.get('*', (req, res) => {
  res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'))
});


// Check your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
