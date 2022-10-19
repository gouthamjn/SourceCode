// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertGuest, getGuest} = require('./database/fmitgms');
const {deleteGuest, updateGuest} = require('./database/fmitgms');

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// ... leave the app definition and the middleware config untouched ...

app.post('/', async (req, res) => {
    const newAd = req.body;
    var GuestID = await insertGuest(newAd);
    if (GuestID !== null && GuestID !== ''){
        res.send({ message: 'GuestID : '+GuestID });
    }
  });

// endpoint to delete an ad
app.delete('/:id', async (req, res) => {
    await deleteGuest(req.params.id);
    res.send({ message: 'Ad removed.' });
  });

// endpoint to update an ad
app.put('/:id', async (req, res) => {
    const updatedAd = req.body;
    await updateGuest(req.params.id, updatedAd);
    res.send({ message: 'Ad updated.' });
  });

// replace the endpoint responsible for the GET requests
app.get('/', async (req, res) => {
  res.send(await getGuest());
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  await insertGuest({title: 'Hello, now from the in-memory database!'});

  // start the server
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});