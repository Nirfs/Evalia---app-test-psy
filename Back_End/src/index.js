const dotenv = require("dotenv");
const http = require("http");
const app = require("./app");

dotenv.config();

const port = process.env.PORT || 3000;
app.set("port", port);

const server = http.createServer(app);

server.on("error", (error) => {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use.`);
      process.exit(1);
    default:
      throw error;
  }
});

server.on("listening", () => {
  console.log(`Server running on http://localhost:${port}`);
});

server.listen(port);
