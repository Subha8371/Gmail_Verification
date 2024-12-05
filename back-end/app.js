const apiRoutes=require( "./src/routes/apiRoutes");
const sequelize = require('./src/database/db.js');
const cors = require("cors");

const express = require('express'); // Importing express
   const app = express(); // Creating an express app

   // Create a route that sends a response when visiting the homepage
   app.get('/', (req, res) => {
     res.send('<h1>Hello, Express.js Server!</h1>');
   });

   app.use(express.static('public'));
   app.use(express.json());
   
   // Enable CORS for specific origin with credentials
   app.use(cors({
     origin: 'http://localhost:3000',
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     credentials: true,
   }));
   app.use('/api',apiRoutes);
   // Set up the server to listen on port 3000
   sequelize.sync()
   .then(() => {
     app.listen(8080, () => console.log('Server started on http://localhost:8080'));
   })
   .catch(err => console.log('Error: ' + err));
 