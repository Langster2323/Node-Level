const morgan = require('morgan');
const config = require('config');
const helmet = require('helmet');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticate');
const debug = require('debug')('app:startup');

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({extended: true})); // don't have to pass extended
app.use(express.static('public'));

app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}

app.use(helmet());

app.use(logger);

app.use(authenticate)

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));