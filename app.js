const dotenv = require(`dotenv`);
const express = require(`express`);
const hbs = require(`hbs`);
const session = require('express-session');
const routes = require(`./routes/routes.js`);
const db = require(`./models/db.js`);
const MongoStore = require('connect-mongo');
const app = express();
const fileUpload = require('express-fileupload');


app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

dotenv.config();
port = process.env.PORT;
url = process.env.DB_URI;
secret = process.env.SECRET;

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(`public`));
app.use(fileUpload())

db.connect();

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: secret,
    store: MongoStore.create({
        mongoUrl: url
    })
}));

app.use(`/`, routes);

app.listen(port, function () {
    
});