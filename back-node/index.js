const express = require('express');


const app = express();

// Db connection
const { mongoose } = require('./src/database/database');

// Settings 
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use('/api/routes', require('./src/routes/routes'));


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});