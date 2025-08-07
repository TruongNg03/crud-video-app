const express = require('express');
const cors = require('cors');
const app = express();

const port = 8765;

const db = require('./config/db/index');
const route = require('./routes');

//db
db.connect();

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(cors());

// route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
