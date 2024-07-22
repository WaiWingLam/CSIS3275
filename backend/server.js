const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './csis3275.env' });
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;

const uri = process.env.DATABASE_URI || 'mongodb://localhost:27017/CSIS3275'

// Set-up database
mongoose.connect(uri)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// import routes
const userRoute = require('./routes/userroute');
const skillRoute = require('./routes/skillroute');
const adminRoute = require('./routes/adminroute');

app.use('/api', userRoute);
app.use('/api', skillRoute);
app.use('/admin', adminRoute);

app.listen(port, () => {
    console.log(`Database is running on port: ${port}`);
});