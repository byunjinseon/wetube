import "./db";

import dotenv from "dotenv";

import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./app";

dotenv.config();

const PORT = process.env.PORTNUM || 4000;

const handleListening = () => console.log(`Listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
