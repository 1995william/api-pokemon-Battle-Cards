import { app } from "./app";

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("App Finished!");
});
