const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017'

// Set-up database
mongoose.connect(uri, 
    { useNewUrlParser: true, 
        useUnifiedTopology: true   
    })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// import routes
const userRoute = require('./routes/userroute');
const skillRoute = require('./routes/skillroute');

app.listen(port, () => {
    console.log(`Database is running on port: ${port}`);
});