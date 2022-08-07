import { app } from "./app";
import { dbConnect } from "./config/dbConnection";
import 'dotenv/config';

const port = process.env.PORT || 8000;

const server = app.listen(port, async () => {
  await dbConnect();
  console.log(`Server running on port http://localhost:${port}/`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("App Finished!");
});
