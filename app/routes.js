const mysql = require('mysql');
const dbconfig = require('../config/database');
const bcrypt = require('bcrypt-nodejs');

const pool = mysql.createPool({connectionLimit: 10, ...dbconfig.connection});
pool.query('USE ' + dbconfig);

module.exports = app => {
	// HOME PAGE
	app.get('/', checkNotAuthenticated, (req, res, next) => {
		res.render('index');
	});

	// LOGIN 
	app.get('/login', checkNotAuthenticated, (req, res, next) => {
		res.render('login');
	});

	// process the login form
	app.post('/login', (req, res) => {
		const {username, password} = req.body;
		pool.query(`SELECT * FROM users WHERE username = ? OR email = ?`, [username, username], (err, rows) => {
			if (err) throw err;
			if (!rows.length || !bcrypt.compareSync(password, rows[0].password)) {
				res.render('login', {
					message: 'Oops! Wrong credentials'
				});
			} else {
				req.session.user = rows[0];
				console.log('THIS IS THE SESSION OBJECT', req.session)
				res.redirect('/profile');
			}
		});
	});

	// SIGNUP 
	app.get('/signup', checkNotAuthenticated, (req, res, next) => {
		pool.getConnection((err, connection) => {
			if(err) throw err;
			pool.query('SELECT * FROM countries', (err, rows) => {
				if(err) throw err;
				const countriesList = JSON.parse(JSON.stringify(rows));
				res.render('signup', {
					countriesList
				});
			})
			connection.release();
		})
	});

	// process the signup form
	app.post('/signup', (req, res) => {
		const {email, name, dateofbirth, country, username, password, password2} = req.body;
		let countriesList;
		pool.query('SELECT * FROM countries', (err, rows) => {
			if(err) throw err;
			countriesList = JSON.parse(JSON.stringify(rows));
		})
		pool.query(`SELECT * FROM users WHERE username = ? OR email = ?`, [username, email], (err, rows) => {
			if (err) throw err;
			if (rows.length > 0) {
				res.render('signup', {
					countriesList,
					message: 'User with such email or username already exists',
					name, dateofbirth, country, password, password2
				});
			} else if (password !== password2) {
				res.render('signup', {
					countriesList,
					message: 'Passwords do not match',
					email, name, dateofbirth, country, username
				});
			} else if (rows.length > 0 && password !== password2) {
				res.render('signup', {
					countriesList,
					message: 'Passwords do not match and user with such email and username already exists.',
					name, dateofbirth, country
				});
			} else {
				// register the user
				hashedPassword = bcrypt.hashSync(password, null, null);
				const unixTime = Math.floor(Date.now() / 1000);

				const newUser = {
					email,
					name,
					dateofbirth,
					country,
					username,
					password: hashedPassword,
					unixTime
				};

				const insertQuery = 'INSERT INTO users SET ?';
				pool.query(insertQuery, {
					email: newUser.email, 
					name: newUser.name, 
					dateofbirth: newUser.dateofbirth,
					country: newUser.country,
					username: newUser.username, 
					password: newUser.password,
					timestamp: newUser.unixTime }, (err, rows) => {
						req.session.user = newUser;
						res.redirect('/profile');
					}
				)
			};
		});
	});

	// PROFILE SECTION 
	app.get('/profile', checkAuthenticated, (req, res, next) => {
		res.render('profile', {
			user : req.session.user
		});
	});

	// LOGOUT
	app.get('/logout', (req, res, next) => {
		req.session.destroy();
		res.redirect('/');
	});

	// IF NOT AUTH REDIRECT TO HOME
	function checkAuthenticated(req, res, next) {
		if (req.session.user) {
			return next();
		}	
		res.redirect('/');
	};

	// IF AUTH REDIRECT TO PROFILE
	function checkNotAuthenticated(req, res, next) {
		if (req.session.user) {
			return res.redirect('/profile');
		}	
		next();
	};
};
