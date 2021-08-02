const mysql = require('mysql');
const dbconfig = require('../config/database');

const connection = mysql.createConnection(dbconfig.connection);
// connection.query('CREATE DATABASE IF NOT EXISTS ' + dbconfig.database);
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `email` VARCHAR(255) UNIQUE, \
    `name` VARCHAR(255) NOT NULL, \
    `dateofbirth` VARCHAR(255) NOT NULL, \
    `country` VARCHAR(255) NOT NULL, \
    `username` VARCHAR(255) UNIQUE, \
    `password` CHAR(255) NOT NULL, \
    `timestamp` VARCHAR(10) NOT NULL, \
    PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
) ENGINE=InnoDB DEFAULT CHARSET=utf8');

connection.query('CREATE DATABASE IF NOT EXISTS ' + dbconfig.database);
connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.countries_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `countryname` varchar(255) NOT NULL, \
    PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
) ENGINE=InnoDB DEFAULT CHARSET=utf8');
connection.query('USE ' + dbconfig.database)
connection.query(`INSERT INTO countries (\`countryname\`) VALUES 
    ('Afghanistan'), 
    ('Åland'), 
    ('Albania'), 
    ('Algeria'), 
    ('American Samoa'), 
    ('Andorra'),
    ('Angola'), 
    ('Anguilla'),
    ('Antarctica'),
    ('Antigua and Barbuda'),
    ('Argentina'),
    ('Armenia'),
    ('Aruba'),
    ('Australia'),
    ('Austria'),
    ('Azerbaijan'),
    ('Bahamas'),
    ('Bahrain'),
    ('Bangladesh'),
    ('Barbados'),
    ('Belarus'),
    ('Belgium'),
    ('Belize'),
    ('Benin'),
    ('Bermuda'),
    ('Bhutan'),
    ('Bolivia'),
    ('Bonaire'),
    ('Bosnia and Herzegovina'),
    ('Botswana'),
    ('Bouvet Island'),
    ('Brazil'),
    ('British Indian Ocean Territory'),
    ('British Virgin Islands'),
    ('Brunei'),
    ('Bulgaria'),
    ('Burkina Faso'),
    ('Burundi'),
    ('Cambodia'),
    ('Cameroon'),
    ('Canada'),
    ('Cape Verde'),
    ('Cayman Islands'),
    ('Central African Republic'),
    ('Chad'),
    ('Chile'),
    ('China'),
    ('Christmas Island'),
    ('Cocos [Keeling] Islands'),
    ('Colombia'),
    ('Comoros'),
    ('Cook Islands'),
    ('Costa Rica'),
    ('Croatia'),
    ('Cuba'),
    ('Curacao'),
    ('Cyprus'),
    ('Czech Republic'),
    ('Democratic Republic of the Congo'),
    ('Denmark'),
    ('Djibouti'),
    ('Dominica'),
    ('Dominican Republic'),
    ('East Timor'),
    ('Ecuador'),
    ('Egypt'),
    ('El Salvador'),
    ('Equatorial Guinea'),
    ('Eritrea'),
    ('Estonia'),
    ('Ethiopia'),
    ('Falkland Islands'),
    ('Faroe Islands'),
    ('Fiji'),
    ('Finland'),
    ('France'),
    ('French Guiana'),
    ('French Polynesia'),
    ('French Southern Territories'),
    ('Gabon'),
    ('Gambia'),
    ('Georgia'),
    ('Germany'),
    ('Ghana'),
    ('Gibraltar'),
    ('Greece'),
    ('Greenland'),
    ('Grenada'),
    ('Guadeloupe'),
    ('Guam'),
    ('Guatemala'),
    ('Guernsey'),
    ('Guinea'),
    ('Guinea-Bissau'),
    ('Guyana'),
    ('Haiti'),
    ('Heard Island and McDonald Islands'),
    ('Honduras'),
    ('Hong Kong'),
    ('Hungary'),
    ('Iceland'),
    ('India'),
    ('Indonesia'),
    ('Iran'),
    ('Iraq'),
    ('Ireland'),
    ('Isle of Man'),
    ('Israel'),
    ('Italy'),
    ('Ivory Coast'),
    ('Jamaica'),
    ('Japan'),
    ('Jersey'),
    ('Jordan'),
    ('Kazakhstan'),
    ('Kenya'),
    ('Kiribati'),
    ('Kosovo'),
    ('Kuwait'),
    ('Kyrgyzstan'),
    ('Laos'),
    ('Latvia'),
    ('Lebanon'),
    ('Lesotho'),
    ('Liberia'),
    ('Libya'),
    ('Liechtenstein'),
    ('Lithuania'),
    ('Luxembourg'),
    ('Macao'),
    ('Macedonia'),
    ('Madagascar'),
    ('Malawi'),
    ('Malaysia'),
    ('Maldives'),
    ('Mali'),
    ('Malta'),
    ('Marshall Islands'),
    ('Martinique'),
    ('Mauritania'),
    ('Mauritius'),
    ('Mayotte'),
    ('Mexico'),
    ('Micronesia'),
    ('Moldova'),
    ('Monaco'),
    ('Mongolia'),
    ('Montenegro'),
    ('Montserrat'),
    ('Morocco'),
    ('Mozambique'),
    ('Myanmar [Burma]'),
    ('Namibia'),
    ('Nauru'),
    ('Nepal'),
    ('Netherlands'),
    ('New Caledonia'),
    ('New Zealand'),
    ('Nicaragua'),
    ('Niger'),
    ('Nigeria'),
    ('Niue'),
    ('Norfolk Island'),
    ('North Korea'),
    ('Northern Mariana Islands'),
    ('Norway'),
    ('Oman'),
    ('Pakistan'),
    ('Palau'),
    ('Palestine'),
    ('Panama'),
    ('Papua New Guinea'),
    ('Paraguay'),
    ('Peru'),
    ('Philippines'),
    ('Pitcairn Islands'),
    ('Poland'),
    ('Portugal'),
    ('Puerto Rico'),
    ('Qatar'),
    ('Republic of the Congo'),
    ('Réunion'),
    ('Romania'),
    ('Russia'),
    ('Rwanda'),
    ('Saint Barthélemy'),
    ('Saint Helena'),
    ('Saint Kitts and Nevis'),
    ('Saint Lucia'),
    ('Saint Martin'),
    ('Saint Pierre and Miquelon'),
    ('Saint Vincent and the Grenadines'),
    ('Samoa'),
    ('San Marino'),
    ('São Tomé and Príncipe'),
    ('Saudi Arabia'),
    ('Senegal'),
    ('Serbia'),
    ('Seychelles'),
    ('Sierra Leone'),
    ('Singapore'),
    ('Sint Maarten'),
    ('Slovakia'),
    ('Slovenia'),
    ('Solomon Islands'),
    ('Somalia'),
    ('South Africa'),
    ('South Georgia and the South Sandwich Islands'),
    ('South Korea'),
    ('South Sudan'),
    ('Spain'),
    ('Sri Lanka'),
    ('Sudan'),
    ('Suriname'),
    ('Svalbard and Jan Mayen'),
    ('Swaziland'),
    ('Sweden'),
    ('Switzerland'),
    ('Syria'),
    ('Taiwan'),
    ('Tajikistan'),
    ('Tanzania'),
    ('Thailand'),
    ('Togo'),
    ('Tokelau'),
    ('Tonga'),
    ('Trinidad and Tobago'),
    ('Tunisia'),
    ('Turkey'),
    ('Turkmenistan'),
    ('Turks and Caicos Islands'),
    ('Tuvalu'),
    ('U.S. Minor Outlying Islands'),
    ('U.S. Virgin Islands'),
    ('Uganda'),
    ('Ukraine'),
    ('United Arab Emirates'),
    ('United Kingdom'),
    ('United States'),
    ('Uruguay'),
    ('Uzbekistan'),
    ('Vanuatu'),
    ('Vatican City'),
    ('Venezuela'),
    ('Vietnam'),
    ('Wallis and Futuna'),
    ('Western Sahara'),
    ('Yemen'),
    ('Zambia'),
    ('Zimbabwe');
`);

console.log('Success: Database Created!');

connection.end();
