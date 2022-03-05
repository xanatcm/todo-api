// Create server Express
const express = require('express');
const cors = require('cors');

//Routers
const { todosRouter } = require('./routes/todos.routes');

//Utils
const { sequelize } = require('./utils/database');

//Init app
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/todo', todosRouter);

//Connection to database
sequelize
  .authenticate()
  .then(() => console.log('Database authenticaded'))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

//Run server
app.listen(4000, () => {
  console.log('To do api running!');
});

// IMPORTANT: Prettier format
// Install cors library (npm i cors)
// app.use(cors())
