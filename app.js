var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose')
const passport = require('passport')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const Student = require('./models/Student')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors())

// mongodb+srv://niaportal:nia@2020@niaportal.jk5s1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
app.use(expressSession({
  secret: '[credentials.secret]',
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://1mustyz:z08135696959@project1.ynhhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native',
  }),
  saveUninitialized: false,
  resave: true
}))

const studentRouter = require('./routes/studentRoute')

/ //connect to db
mongoose.connect('mongodb+srv://1mustyz:z08135696959@project1.ynhhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
mongoose.Promise = global.Promise

// test DB connection
mongoose.connection
  .once('open', () => {
    console.log('mongodb started')
    // connect the server if DB is UP
    // http.listen(PORT, () => {
    //   console.log(`server started `)
    // })
  })
  .on('error', (error) => {
    console.log('error occured:', error)
  })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session())


passport.use('student', Student.createStrategy())

passport.serializeUser(function(user, done) {
  var key = {
    id: user.id,
    type: user.userType
  }
  done(null, key);
})

passport.deserializeUser(function(key, done) {
   Student.findById(key.id, function(err, user) {
    done(err, user)
  }) 

})

app.use('/student', studentRouter)

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
