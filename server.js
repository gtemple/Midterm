// load .env data into process.env



require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const loginApiRoutes = require('./routes/login-api');
const commentsApiRoutes =  require('./routes/comments-api.js');
const resourcesApiRoutes = require('./routes/resources-api.js'); //resource router
const loginRouter = require('./routes/login-router.js');
const searchRouter = require('./routes/search-router.js');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
//all resources endpoint

app.use('/api/resources', resourcesApiRoutes);


app.use('/api/login', loginApiRoutes);
app.use('/search', searchRouter);
app.use('/api/comments', commentsApiRoutes);

// Note: mount other resources here, using the same pattern above

app.use('/login', loginRouter);
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
