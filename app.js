const session = require('express-session'),
      flash = require('connect-flash'),
      express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      expressValidator = require('express-validator'),
      mongoose = require('mongoose');
      // Schema = mongoose.Schema;

// mongoose connect
mongoose.connect('mongodb://localhost/blog');
const db = mongoose.connection;

// init
const app = express();
const port = 9000;

const index = require('./routes/index');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const manage = require('./routes/manage');

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// moment for date formatting
app.locals.moment = require('moment');

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set pub static folder
app.use(express.static(path.join(__dirname, 'public')));

// express messages
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
})

// express validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    const namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.get('/', index);
app.get('/articles', articles);
app.get('/article', articles);
app.post('/add/article', articles);
app.get('/articles/show/:id', articles);
app.post('/edit/article/:id', articles);

app.get('/categories', categories);
app.post('/add/category', categories);
app.get('/category/:id', categories);
app.post('/edit/category/:id', categories);

app.get('/delete/category/:id', categories);
app.get('/delete/article/:id', manage);

app.get('/manage', manage);
app.get('/manage/articles/', manage);
app.get('/manage/categories/', manage);

app.get('/manage/add/article/', manage);
app.get('/manage/edit/article/:id', manage);
app.get('/manage/add/category/', manage);
app.get('/manage/edit/category/:id', manage);

app.get('/article/category/:categoryid', articles)
app.post('/article/comments/add/:id', articles)



app.listen(port, () => {
  console.log('Spork blog server started on port ' + port);
});
