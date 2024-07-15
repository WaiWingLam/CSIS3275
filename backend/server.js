const express = require('express');
// const session = require('express-session');
const mongoose = require('mongoose');
// const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017/CSIS3275'

// const store = new MongoDBStore({
//     uri: uri,
//     collection: 'sessions'
// });

// app.use(session({
//     secret: 'randomitem',
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 
//     }
//   }));

// Set-up database
mongoose.connect(uri)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// mongoose.connect(uri, 
//     { useNewUrlParser: true, 
//         useUnifiedTopology: true
//     })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.error('MongoDB Connection Error:', err));

// import routes
const userRoute = require('./routes/userroute');
const skillRoute = require('./routes/skillroute');

app.use('/api', userRoute);
app.use('/api', skillRoute);

app.listen(port, () => {
    console.log(`Database is running on port: ${port}`);
});