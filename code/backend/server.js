/*
  @author:
    Davide
    Giuseppe

  @description:
    Questo file è il punto di partenza del nostro server.
    Qui vengono importati i moduli necessari e viene
    impostato il server.

  @version: 1.0.0
*/


/* IMPORT VARI */

const express = require('express');
const cookieParser = require("cookie-parser");
const config = require('./config'); // Contiene variabili utili per il server
const { clientMDB, connectToDatabase, disconnectFromDatabase }  = require('./utils/dbmanagement'); 
const scheduler = require("./utils/notifications"); // Per gestire l'invio degli eventi


/* SETUP SERVER */

const app = express();
const PORT = config.PORT || 8000;
let server = null;



/* MIDDLEWARE */

// Middleware per autenticare JWT
const { authenticateJWT, nonBlockingAutheticateJWT, getUserId } = require('./middleware/authorization'); 

// Gestione di CORS per poter usare Vite dev per sviluppare il frontend
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000' // Allow only the Vite dev server to access
}));



/* ROUTES */

app.get("/testingDirectory/impossibleToFind/diagnostic", function (req, res) {
  res.send("Server on");
});

app.use(express.json()) // Per parsing di application/json

// Per gestire gli errori in modo personalizzato, per esempio se il body non è JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err);
      return res.status(400).send({ status: 400, message: err.message }); // Bad request
  }
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use("/api", require(config.ROUTESERVIZI + "/registration"))
app.use("/api", require(config.ROUTESERVIZI + "/login"))
app.use("/api", require(config.ROUTESERVIZI + "/diagnostic"))
app.use("/api", require(config.ROUTESERVIZI + "/notes"))
app.use("/api", require(config.ROUTESERVIZI + "/calendars"))
app.use("/api", require(config.ROUTESERVIZI + "/events"))
app.use("/api", require(config.ROUTESERVIZI + "/tasks"))
app.use("/api", require(config.ROUTESERVIZI + "/account"))  
app.use("/api", require(config.ROUTESERVIZI + "/studyevents"))
app.use("/api", require(config.ROUTESERVIZI + "/pomodoro"))
app.use("/api", require(config.ROUTESERVIZI + "/messages"))
app.use("/api", require(config.ROUTESERVIZI + "/restrictedPeriods"))

// Setup per mandare le richieste di "/" a "routes/webpages" package
app.get("*", require(config.ROUTESERVIZI + "/webpages"));




/* SERVER START */
function startServer() {
  server = app.listen(PORT, () => {
    // Ci colleghiamo al database
    connectToDatabase();
    
    // Avviamo il task scheduler
    scheduler.checkEvents();
  });
}
startServer();



/* SERVER END */

// Capture termination and interrupt signals
function handleShutdown() {
  //console.log("Spegnendo server...");
  disconnectFromDatabase().then(() => {
    process.exit(0);
  });
  server.close();
}

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

module.exports = {
  app,
  server
};
