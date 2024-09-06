const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cleanUp = require('./utils/cleanUp');

const sequelize = require('./config/connection');
const routes = require('./controller');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: { maxAge: 30000},
  resave: false,
  rolling: true,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname+ '/public/')));

app.use(routes);
app.use('*', (req, res)=>{
  res.redirect('/home');
})

sequelize.sync({alter: true}).then(() =>{
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

setInterval(cleanUp, 10 * 60 * 1000) //Deletes expired sessions every 10 minutes