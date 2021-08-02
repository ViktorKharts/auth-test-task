const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const expressEjsLayouts = require('express-ejs-layouts');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(expressEjsLayouts)
app.set('view engine', 'ejs');

app.use(session({
	secret: 'thisisasecretcodethatnooneshouldeverknow',
	resave: false,
	saveUninitialized: false
}));

require('./app/routes.js')(app);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
