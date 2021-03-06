const http = require("http");
const app = require("./app");
const notify = require("./routes/notification");
const leaveController = require("./controllers/leaveController");
const cron = require("node-cron");

require("dotenv").config();
// set the application port
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Define an error handler
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// create a server
const server = http.createServer(app);

// set the error handler and a event listener
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
  // schedule cron job in the first day of january
  cron.schedule("0 0 0 1 1 *", () => {
    leaveController.resetDaysCount();
  });
  notify();
  setInterval(() => {
    notify();
  }, 86400000);
});

// make server listen on port
server.listen(port);

